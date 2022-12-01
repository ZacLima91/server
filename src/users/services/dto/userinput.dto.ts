import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator'

export class UserDto {
    @ApiProperty({
        example: 'Zac',
        description: 'Nome do usuário a ser criado',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'zac@mail.com',
        description: 'Email do usuário a ser criado',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'weak password',
    })
    @ApiProperty({
        example: '@Abc1234',
        description:
            'Senha do usuário a ser criado, mínimo uma letra maiuscula, uma letra minuscula, um número e um simbolo.',
    })
    password: string;

    @ApiProperty()
    @IsString()
    role: string;
}