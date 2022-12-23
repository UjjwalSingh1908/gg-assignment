import React from 'react';
import './App.css';
import { SettingOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import Table from './components/Table'
import axios from 'axios';
const { RangePicker } = DatePicker;


const header = [
  {
    id:"1",
    name: "App ID",
    key: "app_id",
    visibility:true,
  },
  {
    id:"2",
    name: "Clicks",
    key:"clicks",
    visibility:true,
  },
  {
    id:"3",
    name: "Date",
    key:"date",
    visibility:true,
  },
  {
    id:"4",
    name: "Impressions",
    key:"impressions",
    visibility:true,
  },
  {
    id:"5",
    name: "Requests",
    key:"requests",
    visibility:true,
  },
  {
    id:"6",
    name: "Responses",
    key:"responses",
    visibility:true,
  },
  {
    id:"7",
    name: "Revenue",
    key:"revenue",
    visibility:true,
  }
]

function App() {

  const [width, setWidth] = useState("block")
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [data, setData ] = useState(null)
  const [columns, updateColumns] = useState(header);
  const [headers, setHeaders] = useState(header);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(columns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateColumns(items);
  }

  const onChange = (date, dateString) => {
    console.log(dateString[1]);
    setFrom(dateString[0]);
    setTo(dateString[1]);
  };


  const visibilityHandler = (id, visibility) => {
    const temp = {...columns[id-1]};
    temp.visibility = !visibility;
    let tc = [...columns];
    tc[id - 1] = temp;
    updateColumns(tc); 
  }

  const handleApply = () => {
    let temp = Array.from(columns);
    setHeaders(temp);
  }



  useEffect(() => {
    if (from !== null & to !== null)
      axios.get(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${from}&endDate=${to}`).then(res => { console.log(res.data.data); setData(res.data.data) }).catch(err => console.log(err));
  }, [to])

  return (
    <div className='container' >
      <div className='app-h1' >
        Analytics
      </div>
      <div className='header' > 
      <RangePicker onChange={onChange} />
      <Button icon={<SettingOutlined />} onClick={ () => { width == "block" ?setWidth("none") : setWidth("block")  }  } >Settings</Button>
      </div>

       <div style={{ display: width }} className='settings' >
        Dimensions and Metrics
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {columns.map(({ id, name, visibility }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li onClick={()=>visibilityHandler(id, visibility)} style={{background:'aliceblue'}} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p
                            style={{ background: `${visibility ? "antiquewhite" : "white"}` }}
                          >
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <Button onClick={handleApply}>Apply</Button>
       </div>
      <Table data={data} header={headers} />
    </div>
  );
}

export default App;
