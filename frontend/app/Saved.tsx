import React from 'react'
import { Stack, Text, ScrollView } from 'tamagui'

// Dummy data for Wraps
const savedWraps = [
  { id: '1', title: 'My 2022 Wrapped', date: 'December 2022' },
  { id: '2', title: 'My 2021 Wrapped', date: 'December 2021' },
  { id: '3', title: 'Top Songs 2020', date: 'December 2020' },
  // Add more saved Wraps as needed
]

const WrapItem = ({ title, date }) => (
  <Stack
    padding="16px"
    marginVertical="8px"
    backgroundColor="white"
    borderRadius="10px"
    width="90%"
    alignItems="center"
  >
    <Text fontWeight="bold" fontSize="18px">{title}</Text>
    <Text color="#666">{date}</Text>
  </Stack>
)

const SavesScreen = () => {
  return (
    <Stack flex={1} alignItems="center" justifyContent="center" padding="20px">
      <Text fontSize="24px" fontWeight="bold" marginBottom="20px">
        Saved Wraps
      </Text>

      {/* Use ScrollView to enable scrolling without FlatList */}
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
        {savedWraps.map((wrap) => (
          <WrapItem key={wrap.id} title={wrap.title} date={wrap.date} />
        ))}
      </ScrollView>
    </Stack>
  )
}

export default SavesScreen
