const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer } = require("apollo-server");
import { gql } from "@apollo/client";
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type User {
        username: String!
        email: String!
        createdAt: String
        displayName: String!
        photoURL: String
        uid: String!
        # actors: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
    }

    type Skill {
        name: String!
        photoURL: String!
        description: String!
        field: String!
    }
`;

const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "160333")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})

export const CreateUsers = gql`
    mutation CreateUsers($input: [UserCreateInput!]!) {
        createUsers(input: $input) {
            users {
                username
                email
                createdAt
                displayName
                photoURL
                uid
            }
        }
    }
`