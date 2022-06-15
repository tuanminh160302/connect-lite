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
mutation UpdateSkills($where: SkillWhere, $update: SkillUpdateInput, $connect: SkillConnectInput) {
  updateSkills(where: $where, update: $update, connect: $connect) {
    info {
      relationshipsCreated
    }
  }
}
`