import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      "https://kuluhbjnoalipgdwlzdq.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bHVoYmpub2FsaXBnZHdsemRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMjAyMzksImV4cCI6MjAxMDU5NjIzOX0.ZIv8uAc3Hmj-dag-P2BxPk4ZGYgCnuDv-o_TeGsZhP4"
    );
  }

  getSupabase(): SupabaseClient {
    return this.supabase;
  }
}
