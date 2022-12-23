import React from 'react'

function Table(props) {
  return (
      <div>
          <table>
            <tr>
              {props.header.map((item, id)=>{
                return item.visibility ? <th style={{ padding: "0 20px" }}>{item.name}</th> : null;
              })}
            </tr>
            
              {
                  props.data !== null ? props.data.map((dataItem, id) => {
                  return (
                      <tr>
                          {props.header.map((item, id) =>  item.visibility?<td style={{ padding: "0 20px" }}>{dataItem[item.key]}</td>:null)}
                      </tr>
                  );
              })
                
            : null}
          </table>
    </div>
  )
}

export default Table