import { useEffect, useState } from 'react';
import useSwr from 'swr';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const fetcher = (url, options) => {
  let params = '';
  Object.keys(options).map((key, index) => {
    if(index == 0) params += `?${key}=${options[key]}`
    else params += `&${key}=${options[key]}`
  })

  url += params;
  return fetch(url).then(res => res.json())
};

export default function AgentList({limit}) {
  const { data, error } = useSwr(['/api/players', limit], (url, limit) => fetcher(url, {limit: limit}));
  const [renderedList, setRenderedList] = useState([]);

  useEffect(() => {
    if(data) setRenderedList(data);
  }, [data])

  if(error) {
    console.error(error);
    return <div>Failed to load players</div>
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Player Name</Th>
          <Th>Most Recent Team</Th>
          <Th>Roles</Th>
        </Tr>
      </Thead>
      <Tbody>
        {renderedList.map(agent => (
          <Tr key={agent.name}>
            <Td>{agent.name}</Td>
            <Td>{agent.team}</Td>
            <Td>{agent.roles}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}