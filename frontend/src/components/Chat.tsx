import { ChatBox } from './ChatBox'
import { useState, useEffect } from 'react'
import { Chatsidebar } from './ChatSideBar'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { ChatTypes, myInfo } from '../lib/types'
import jwt_decode from 'jwt-decode'
import { UserChatBox } from './UserChatBox'
import { useNavigate } from 'react-router'
import { ChakraProvider } from '@chakra-ui/react'
import { InvalidChat } from './InvalidChat'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://localhost:4000/graphql/subscription'
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
// chat -> 'akjhsxkahskajk' to { type: 'room', id: 'akjhsxkahskajk' } | { type: 'user', id: 'akjhsxkahskajk'}
export const Chat = () => {
  const [chat, setChat] = useState<ChatTypes>({ type: 'none', id: '' })
  const [myInfo, setMyInfo] = useState<myInfo>({
    id: '',
    name: 'Anonymous',
    email: '',
    avatar:
      'https://fastly.picsum.photos/id/379/536/354.jpg?hmac=I4bs_0ZcfxuA6apwsLHEPAqDxBprHAwMwtdoK8oJCOU',
    exp: 0,
    iat: 0
  })

  const navigate = useNavigate()

  useEffect(() => {
    const cookieString = document.cookie
    console.log(cookieString)
    const cookies: any = {}
    const cookieArray = cookieString.split(';')
    cookieArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split('=')
      cookies[key] = value
    })
    const jwtToken = cookies.cookie
    if (jwtToken) {
      const decoded: myInfo = jwt_decode(jwtToken)
      setMyInfo(decoded)
    } else {
      navigate('/')
    }
  }, [navigate])

  const onSelectRoom = (roomId: string) => {
    setChat({ type: 'room', id: roomId })
  }

  const onSelectUser = (userId: string) => {
    setChat({ type: 'user', id: userId })
  }

  const chatComp =
    chat.type === 'none' ? (
      <InvalidChat />
    ) : chat.type === 'room' ? (
      <ChatBox myId={myInfo.id} email={myInfo.email} roomId={chat.id} />
    ) : (
      <UserChatBox myId={myInfo.id} email={myInfo.email} userId={chat.id} />
    )

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <div className='flex bg-black'>
          {chatComp}
          <Chatsidebar
            myProfile={myInfo}
            onSelectUserChat={onSelectUser}
            onSelectRoomChat={onSelectRoom}
          />
        </div>
      </ChakraProvider>
    </ApolloProvider>
  )
}
