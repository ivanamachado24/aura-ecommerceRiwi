import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Si llegamos aquí, el usuario está autenticado
    const token = req.nextauth.token;
    
    // Verificar que tenga rol de admin
    if (token?.role !== "admin") {
      return NextResponse.json(
        { error: "No tienes permisos para acceder a esta área" },
        { status: 403 }
      );
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Permitir solo si hay token (usuario autenticado)
        return !!token;
      },
    },
  }
);

// Configurar qué rutas proteger
export const config = {
  matcher: ["/admin/:path*"],
};
