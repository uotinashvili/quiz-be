import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import fetch from 'node-fetch';
import * as crypto from 'crypto';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _userService: UserService) {}

  @Get('/:code')
  async auth(
    @Param('code') code: string,
    @Session() session: Record<string, any>,
  ) {
    try {
      const clientId = process.env.ZOOM_CLIENT_ID;
      const clientSecret = process.env.ZOOM_CLIENT_SECRET;
      const redirectUrl = process.env.ZOOM_REDIRECT_URL;

      const token = await this.getToken(
        code,
        clientId,
        clientSecret,
        redirectUrl,
      );

      const userInfo = await this.getUserInfo(token);

      const user = {
        userId: userInfo.id,
        email: userInfo.email,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        token: token,
      } as UserDto;

      await this._userService.auth(user);

      session.userId = user.userId;

      return user;
    } catch (err) {
      throw new UnauthorizedException('Bad Auth Request!');
    }
  }

  @Get('zoom/deeplink/:token')
  async getDeepLink(@Param('token') token: string) {
    const response = await fetch(
      `${process.env.ZOOM_API_URL}zoomapp/deeplink`,
      {
        method: 'POST',
        body: JSON.stringify({
          action: JSON.stringify({
            url: '/',
            role_name: 'Owner',
            verified: 1,
            role_id: 0,
          }),
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      },
    );

    return await response.json();
  }

  @Get('zoom/installurl')
  @UseGuards(AuthGuard)
  async getInstallUrl() {
    const rand = (fmt: BufferEncoding, depth = 32) =>
      crypto.randomBytes(depth).toString(fmt);

    const base64URL = (s) =>
      s
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

    const state = rand('base64');
    const verifier = rand('ascii');

    const digest = crypto
      .createHash('sha256')
      .update(verifier)
      .digest('base64')
      .toString();

    const challenge = base64URL(digest);

    const zoomApp = {
      host: process.env.ZOOM_APP_HOST,
      clientId: process.env.ZOOM_CLIENT_ID,
      redirectUrl: process.env.ZOOM_REDIRECT_URL,
    };

    const url = new URL('/oauth/authorize', zoomApp.host);

    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', zoomApp.clientId);
    url.searchParams.set('redirect_uri', zoomApp.redirectUrl);
    url.searchParams.set('code_challenge', challenge);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('state', state);

    return { url, state, verifier };
  }

  private async getToken(
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUrl: string,
  ): Promise<string> {
    const buffer = Buffer.from(clientId + ':' + clientSecret);
    const response = await fetch(
      `${process.env.ZOOM_APP_HOST}/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUrl}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${buffer.toString('base64')}`,
        },
      },
    );

    if (!response.ok) {
      throw new BadRequestException('Token is not generated correctly!');
    }

    const data = await response.json();

    return data.access_token;
  }

  private async getUserInfo(token: string) {
    const response = await fetch(`${process.env.ZOOM_API_URL}users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  }
}
