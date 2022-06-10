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

export const QuerySkills = gql `
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

export const QueryPeople = gql `
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