// supabase.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('users')
  async getAllUsers() {
    return this.supabaseService.getAllUsers();
  }

  @Post('users')
  async addUser(@Body() userData: any) {
    return this.supabaseService.addUser(userData);
  }
}
