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

`

export const UpdateSkillConnect = gql`

`

export const UpdateSkillDisconnect = gql`

`