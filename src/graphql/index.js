import { gql } from "@apollo/client"

export const CreateUsers = gql`
    mutation CreateUsers($input: [UserCreateInput!]!) {
        createUsers(input: $input) {
            users {
                uid
                username
                email
                createdAt
                displayName
                photoURL
            }
        }
    }
`

export const QuerySkills = gql`
    query Skills {
        skills {
            name
            photoURL
            description
            id
    }
}
`

export const QuerySkill = gql`
    query Skills($where: SkillWhere) {
        skills(where: $where) {
            id
            name
            photoURL
            description
    }
}
`

export const QueryPeople = gql`
    query Users {
        users {
            username
            email
            createdAt
            displayName
            photoURL
            uid
        }
}
`

export const QueryUser = gql`
    query Users($where: UserWhere) {
        users(where: $where) {
            username
            email
            createdAt
            displayName
            photoURL
            uid
        }
    }
`

export const QueryRelatedSkills = gql`
query Skills($where: SkillWhere) {
  skills(where: $where) {
    skillIn {
      hasSkill {
        name
        photoURL
        description
        id
      }
    }
  }
}
`

export const updateUserToSkill = gql`
mutation UpdateUsers($where: UserWhere, $connect: UserConnectInput) {
  updateUsers(where: $where, connect: $connect) {
    users {
      username
    }
  }
}
`

export const QueryUserAllSkills = gql`
query HasSkill($where: UserWhere) {
  users(where: $where) {
    hasSkillConnection {
      edges {
        node {
          name
          photoURL
          description
          id
        }
        level
      }
    }
  }
}
`

export const QueryUserToSkill = gql`
query Users($where: UserWhere, $hasSkillConnectionWhere2: UserHasSkillConnectionWhere) {
  users(where: $where) {
    hasSkillConnection(where: $hasSkillConnectionWhere2) {
      edges {
        level
      }
    }
  }
}
`

export const DeleteUserToSkill = gql`
mutation UpdateUsers($disconnect: UserDisconnectInput, $where: UserWhere) {
  updateUsers(disconnect: $disconnect, where: $where) {
    info {
      relationshipsDeleted
      nodesDeleted
    }
  }
}
`

export const QueryAdmin = gql`
query Admins {
  admins {
    uid
  }
}
`

export const CreateJobRole = gql`
mutation CreateJobRoles($input: [JOB_ROLECreateInput!]!) {
  createJobRoles(input: $input) {
    info {
      nodesCreated
    }
  }
}
`

export const QueryCategoryValueOnly = gql`
query Categories {
  categories {
    value
  }
}
`

export const QueryJobRoleValueOnly = gql`
query Categories {
  jobRoles {
    value
  }
}
`