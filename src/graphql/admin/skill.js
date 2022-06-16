import { gql } from "@apollo/client"

export const CreateSkill = gql`
mutation CreateSkills($input: [SkillCreateInput!]!) {
  createSkills(input: $input) {
    info {
      nodesCreated
    }
  }
}
`

export const DeleteSkill = gql`
mutation DeleteSkills($where: SkillWhere) {
  deleteSkills(where: $where) {
    nodesDeleted
  }
}
`

export const UpdateSkillInfo = gql`
mutation UpdateSkills($where: SkillWhere, $update: SkillUpdateInput, $connect: SkillConnectInput, $disconnect: SkillDisconnectInput) {
  updateSkills(where: $where, update: $update, connect: $connect, disconnect: $disconnect) {
    info {
      relationshipsCreated
    }
  }
}
`

export const UpdateSkillConnect = gql`
mutation UpdateSkills($where: SkillWhere, $connect: SkillConnectInput) {
  updateSkills(where: $where, connect: $connect) {
    info {
      relationshipsCreated
    }
  }
}
`

export const UpdateSkillDisconnect = gql`
mutation UpdateSkills($where: SkillWhere, $disconnect: SkillDisconnectInput) {
  updateSkills(where: $where, disconnect: $disconnect) {
    info {
      relationshipsDeleted
    }
  }
}
`