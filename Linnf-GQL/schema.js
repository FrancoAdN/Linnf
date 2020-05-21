const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLBoolean} = require('graphql')
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

//Login Type
const LoginType = new GraphQLObjectType({
    name: 'LoginType',
    fields: () => ({
        id_user: { type: GraphQLID }
    })
})

const ProfileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: () => ({
        users_post: { type: UsPostType },
        following: { type: GraphQLInt },
        followers: { type: GraphQLInt },
        is_following: { type: GraphQLBoolean }
    })
})

const RecentChatsType = new GraphQLObjectType({
    name: 'RChatType',
    fields : () => ({
        id_user: { type: GraphQLID },
        username: { type: GraphQLString},
        user_avatar: { type: GraphQLString} 
    })
})

const MessageType = new GraphQLObjectType({
    name: 'MessageType',
    fields: () => ({
        id_msg: { type: GraphQLID },
        from_id: { type: GraphQLInt },
        to_id: { type: GraphQLInt },
        message: { type: GraphQLString },
        date_time: { type: GraphQLString}
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
        post: {
            type: PostType,
            args:{
                id_post: {type: GraphQLID}
            },
            resolve: (parent, args) => {
                return axios.get(`http://192.168.0.9:4000/p/${args.id_post}`).then(res => res.data)
            }
        },
        profile: {
            type: ProfileType,
            args:{
                user: {type: GraphQLID},
                profile:{ type: GraphQLID}
            },
            resolve: async (parent, args) => {
                let profile = await axios.get(`http://192.168.0.9:4000/usersposts/${args.profile}`)
                let follow = await axios.get(`http://192.168.0.9:4000/count/followers/${args.profile}`)
                if (args.profile == args.user) {
                    return {
                        users_post: profile.data,
                        following: follow.data.following,
                        followers: follow.data.followers,
                        is_following: null
                    }
                } else {
                    let is_following = await axios.get(`http://192.168.0.9:4000/follows?user=${args.user}&&follow=${args.profile}`)
                    return {
                        users_post: profile.data,
                        following: follow.data.following,
                        followers: follow.data.followers,
                        is_following: is_following.data
                    }
                }

            }
            
        },
        login:{
            type: LoginType,
            args:{
                email:{ type: GraphQLString },
                pwd: { type: GraphQLString }
            },
            resolve: async (parent, {email, pwd}) => {
                let res = await axios.get(`http://192.168.0.9:4000/login?email=${email}&&pwd=${pwd}`)
                return res.data                
            
            }
        },
        users_post: {
            type: UsPostType,
            args:{
                id_user:{ type: GraphQLID}
            },
            resolve: async(parent, args) => {
                let user = await axios.get(`http://192.168.0.9:4000/users/${args.id_user}`)
                let posts = await axios.get(`http://192.168.0.9:4000/posts/${args.id_user}`)
                return {
                    user: user.data,
                    posts: posts.data
                }
                
            }
            
        },
        search: {
            type: new GraphQLList(UserType),
            args:{
                user:{ type: GraphQLString}
            },
            resolve: async(parent, args) => {
                if (args.user != ''){
                    let user = await axios.get(`http://192.168.0.9:4000/q?user=${args.user}`)
                    return user.data
                } else return []
                
                
            }
            
        },
        recent_chats : {
            type: GraphQLList(RecentChatsType), 
            args: {
                user: {type: GraphQLID}
            },
            resolve: async (parent, args) => {
                let chats = await axios.get(`http://192.168.0.9:4000/recentchats?user=${args.user}`)
                return chats.data
            }
        },
        conversation: {
            type: GraphQLList(MessageType),
            args :{
                from: {type: GraphQLInt},
                to: {type: GraphQLInt}
            },
            resolve: async (parent, args) => {
                let chats = await axios.get(`http://192.168.0.9:4000/conversation?from=${args.from}&&to=${args.to}`)
                return chats.data
            }
        }
        

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})