import { NextResponse } from "next/server";
import * as yup from "yup";

const userShema = yup.object().shape({
    username: yup.string().required().min(3),
    email: yup.string().email().required(),
    password : yup.string().required().min(6),   
});



export async function POST(request: Request) {
    try {
        const body = await request .json();
        const isValid = await userShema.isValid(body);

        return NextResponse.json(
            { message : "validacion exitosa", data: isValid},
            { status: 200}        
        );

    } catch (error :any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    }
