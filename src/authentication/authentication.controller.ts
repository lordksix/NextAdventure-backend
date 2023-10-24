import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';
import { FacebookGuard } from './guard/facebook.guard';
import { AuthenticationService } from './authentication.service';
import { Request } from 'express';
import { BadRequestResponse } from 'src/utils/response/badrequest.response';
import { SuccessResponse } from 'src/utils/response/success.response';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {
    return this.authenticationService.validateUser(req);
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req) {
    return this.authenticationService.validateUser(req);
  }

  @Get('facebook')
  @UseGuards(FacebookGuard)
  async facebookAuth(@Req() req) {
    return this.authenticationService.validateUser(req);
  }

  @Get('facebook/callback')
  @UseGuards(FacebookGuard)
  async facebookAuthRedirect(@Req() req) {
    return this.authenticationService.validateUser(req);
  }

  @Post('refresh-token/:refreshToken')
  async refreshAccessToken(@Param('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw BadRequestResponse.response('Refresh token is required');
    }
    const tokens =
      await this.authenticationService.refreshAccessToken(refreshToken);

    return SuccessResponse.response('success', {
      accessToken: tokens.encryptedAccessToken,
      refreshToken: tokens.encryptedRefreshToken,
    });
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
