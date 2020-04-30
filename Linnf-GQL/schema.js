const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInt} = require('graphql')
const axios = require('axios')

// User Type
const  UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id_user: { type: GraphQLID },
        username: { type: GraphQLString},
        user_email: { type: GraphQLString},
        user_pwd: { type: GraphQLString},
        user_type: { type: GraphQLString},
        user_avatar: { type: GraphQLString}
    })
})


//Post Type
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id_post: {type: GraphQLID},
        post_date: {type: GraphQLString},
        post_desc: {type: GraphQLString},
        post_img: {type: GraphQLString},
        user: {type: UserType}
    })
})

//User's Post Type
const UsPostType = new GraphQLObjectType({
    name: 'UsersPost',
    fields: () => ({
        user: { type: UserType},
        posts: { type: new GraphQLList(PostType)}
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users:{
            type: new GraphQLList(UserType),
            resolve: (parent, args) => {
                return axios.get('http://192.168.0.9:4000/users').then(res => res.data)
            }
        },
        user: {
            type: UserType,
            args:{
                id_user: {type: GraphQLID}
            },
            resolve: (parent, args) => {
                return axios.get(`http://192.168.0.9:4000/users/${args.id_user}`).then(res => res.data)
            }
        },
        posts:{
            type: new GraphQLList(PostType),
            resolve: (parent, args) => {
                return axios.get('http://192.168.0.9:4000/posts').then(res => res.data)
            }
        },
        post: {
            type: PostType,
            args:{
                id_post: {type: GraphQLID}
            },
            resolve: (parent, args) => {
                return axios.get(`http://192.168.0.9:4000/posts/${args.id_post}`).then(res => res.data)
            }
        },
        users_post: {
            type: UsPostType,
            args:{
                id_user:{ type: GraphQLID}
            },
            resolve: (parent, args) => {
                return axios.get(`http://192.168.0.9:4000/usersposts/${args.id_user}`).then(res => res.data)
            }
            
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})