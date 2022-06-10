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