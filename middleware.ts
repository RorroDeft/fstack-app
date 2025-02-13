// middleware.js o middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Validación para /client/services: se requiere la cookie "formPassed"
  if (pathname.startsWith('/client/services')) {
    const formPassed = request.cookies.get('formPassed');
    if (!formPassed) {
      const url = request.nextUrl.clone();
      url.pathname = 'client/form';
      return NextResponse.redirect(url);
    }
  }

  // Validación para /dashboard: se requiere la cookie "isLoggedIn"
  if (pathname.startsWith('/dashboard')) {
    const isLoggedIn = request.cookies.get('isLoggedIn');
    if (!isLoggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Si se cumplen las condiciones o la ruta no está protegida, continúa la ejecución
  return NextResponse.next();
}

// Limita el middleware a las rutas /client/services y /dashboard (y subrutas)
export const config = {
  matcher: ['/client/services/:path*', '/dashboard/:path*'],
};
