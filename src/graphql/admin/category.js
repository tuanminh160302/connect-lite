import { gql } from "@apollo/client"

export const CreateCategory = gql`
mutation CreateCategories($input: [CATEGORYCreateInput!]!) {
  createCategories(input: $input) {
    info {
      nodesCreated
    }
  }
}
`

// export const DeleteCategory = gql`

// `
 
// export const UpdateCategoryInfo = gql`

// `

// export const UpdateCategoryConnect = gql`

// `

// export const UpdateCategoryDisconnect = gql`

// `