import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
	fullname: string;
	address: string;
	email: string;
	phone: string;
}
