import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';
import { FacebookGuard } from './guard/facebook.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {
    return this.authenticationService.authLogin(req, 'google');
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req) {
    return this.authenticationService.authLogin(req, 'google');
  }

  @Get('facebook')
  @UseGuards(FacebookGuard)
  async facebookAuth(@Req() req) {
    return this.authenticationService.authLogin(req, 'facebook');
  }

  @Get('facebook/callback')
  @UseGuards(FacebookGuard)
  async facebookAuthRedirect(@Req() req) {
    return this.authenticationService.authLogin(req, 'facebook');
  }
}
