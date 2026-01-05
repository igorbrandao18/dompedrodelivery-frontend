export interface PublicRegisterInput {
  tenantName: string;
  name: string;
  email: string;
  phone?: string;
}

export interface PublicRegisterResponse {
  tenant?: { id?: string; slug: string; name?: string };
}

export class PublicRegisterService {
  static async register(input: PublicRegisterInput): Promise<PublicRegisterResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tenantName: input.tenantName,
        name: input.name,
        email: input.email,
        phone: input.phone || undefined,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.message || `HTTP ${response.status}`);
    }

    return (await response.json()) as PublicRegisterResponse;
  }
}

export const publicRegisterService = PublicRegisterService;
