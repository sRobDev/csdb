import { useEffect, useState } from 'react';
import useSwr from 'swr';
import mapping from '../configs/mapping.json'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Checkbox
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
  const [columns, setColumns] = useState({...mapping});
  const { data, error } = useSwr(['/api/players', limit], (url, limit) => fetcher(url, {limit: limit}));
  const [renderedList, setRenderedList] = useState([]);
  
  const handleCheck = (key, checked) => {
    setColumns(curr => {
      let update = {...curr[key]};
      update.checked = checked;
      return {...curr, [key]: update}
    });
  }

  useEffect(() => {
    if(data) setRenderedList(data);
  }, [data]);

  if(error) {
    return <div>Failed to load players</div>
  }

  return (
    <Box m={5}>
      <Stack m={5} spacing={10} direction="row" justifyContent={'space-between'}>
        {Object.keys(columns).map(key => (
          <Checkbox key={key} colorScheme="teal" defaultChecked={columns[key].default} onChange={(e) => handleCheck(key, e.target.checked)}>{columns[key].label}</Checkbox>
        ))}
      </Stack>
      <Table p={5} variant="simple">
        <Thead>
          <Tr>
            {Object.values(columns).filter(value => value.checked).map(item => (
              <Th key={item.label}>{item.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          
          {renderedList.map(agent => (
            <Tr key={agent.name}>
              {Object.keys(columns).map(key => {
                if(columns[key].checked) return <Td key={key}>{agent[key]}</Td>
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
