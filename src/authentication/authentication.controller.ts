import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {
    return this.authenticationService.googleLogin(req);
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req) {
    return this.authenticationService.googleLogin(req);
  }
}
