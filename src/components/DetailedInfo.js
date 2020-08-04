import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./DetailedInfo.css";

const DetailedInfo = ({ entry }) => (
  <div className="table-info">
    <p>
      Выбран пользователь <b>{`${entry.firstName} ${entry.lastName}`}</b>
    </p>
    {entry.description && (
      <>
        <p>Описание:</p>
        <TextareaAutosize
          value={entry.description}
          readOnly={true}
          style={{ border: "none", resize: "none" }}
        ></TextareaAutosize>
      </>
    )}
    {entry.address && (
      <div>
        <p>
          Адрес проживания: <b>{entry.address.streetAddress}</b>
        </p>
        <p>
          Город: <b>{entry.address.city}</b>
        </p>
        <p>
          Провинция/штат: <b>{entry.address.state}</b>
        </p>
        <p>
          Индекс: <b>{entry.address.zip}</b>
        </p>
      </div>
    )}
  </div>
);

export default DetailedInfo;
