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
mutation UpdateSkills($where: SkillWhere, $update: SkillUpdateInput) {
  updateSkills(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}
`

export const UpdateSkillConnect = gql`
mutation UpdateSkills($connect: SkillConnectInput) {
  updateSkills(connect: $connect) {
    info {
      relationshipsCreated
    }
  }
}
`

export const UpdateSkillDisconnect = gql`
mutation UpdateSkills($disconnect: SkillDisconnectInput) {
  updateSkills(disconnect: $disconnect) {
    info {
      relationshipsDeleted
    }
  }
}
`