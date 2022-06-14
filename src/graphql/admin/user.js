import { gql } from "@apollo/client"

export const CreateUser = gql`
mutation CreateUsers($input: [UserCreateInput!]!) {
  createUsers(input: $input) {
    info {
      nodesCreated
    }
  }
}
`

// export const DeleteUser = gql`

// `
 
// export const UpdateUserInfo = gql`

// `

// export const UpdateUserConnect = gql`

// `

// export const UpdateUserDisconnect = gql`

// `