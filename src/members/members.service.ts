import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberModel } from '../db/models/member.model';

@Injectable()
export class MembersService {
  async create(createMemberDto: CreateMemberDto): Promise<MemberModel> {
    return await MemberModel.query().insert(createMemberDto);
  }

  async findAll(tenantId): Promise<MemberModel[]> {
    return await MemberModel.query().where('member.tenant_id', tenantId);
  }

  async findOne(id: number): Promise<MemberModel> {
    const member = await MemberModel.query().findOne({ id });
    if(!member) throw new BadRequestException('Member not found');
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<MemberModel> {
    const member = await MemberModel.query().findOne({ id });
    if(!member) throw new BadRequestException('Member not found');
    return await MemberModel.query().patchAndFetchById(id, updateMemberDto);
  }

  async remove(id: number): Promise<string> {
    const deletedRows = await MemberModel.query().deleteById(id);
    if (!deletedRows) throw new BadRequestException(`Member with ID ${id} not found`);
    return 'Member deleted';
  }
}
