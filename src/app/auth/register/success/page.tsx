'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterSuccessPage() {
  return (
    <div className="flex items-center justify-center px-4 py-12 min-h-screen">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Conta Criada com Sucesso!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Enviamos um email com sua senha de acesso e as instruções para confirmar sua conta.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-900">
                      Verifique sua caixa de entrada
                    </p>
                    <p className="text-xs text-blue-700">
                      Não se esqueça de verificar a pasta de spam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
              >
                <Link href="/auth/login">
                  Ir para o Login
                </Link>
              </Button>
              
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Não recebeu o email?{' '}
                </span>
                <Link
                  href="#"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Reenviar
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações adicionais */}
        <div className="text-center text-xs text-gray-500 mt-6 space-y-2">
          <p>• Sua conta será ativada após confirmar o email</p>
          <p>• A senha de acesso foi enviada separadamente</p>
          <p>• Em caso de dúvidas, entre em contato com nosso suporte</p>
        </div>
      </div>
    </div>
  );
}
