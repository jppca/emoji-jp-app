import axios from "axios";
import React, { useState } from "react";

// My imports.
import { EmojiCards } from "./components/EmojiCards";
import { BtnGetEmojis } from "./components/BtnGetEmojis";

// Base URL API.
const baseUrl = "https://emojihub.yurace.pro/api";

export function App() {
  const [emojiList, setEmojiList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  // Function in charge of consuming all data to the API.
  const loadAllData = () => {
    axios.get(`${baseUrl}/all/`).then((response) => {
      setEmojiList(convertJsonToArray(response.data));
      setIsSearch(true);
    });
  };

  // Function in charge of consuming random data to the API.
  const loadRandomData = () => {
    axios.get(`${baseUrl}/random/`).then((response) => {
      setEmojiList(convertJsonToArray(response.data));
      setIsSearch(true);
    });
  };

  // Function in charge of consuming data to the API by category-name.
  const loadDataCategory = (categoryName) => {
    axios.get(`${baseUrl}/category/${categoryName}`).then((response) => {
      setEmojiList(convertJsonToArray(response.data));
      setIsSearch(true);
    });
  };

  // Function in charge of consuming data to the API by group-name.
  const loadDataGroup = (groupName) => {
    axios.get(`${baseUrl}/group/${groupName}`).then((response) => {
      setEmojiList(convertJsonToArray(response.data));
      setIsSearch(true);
    });
  };

  const convertJsonToArray = (json) => {
    return json.map((item) => ({
      name: item.name,
      category: item.category,
      group: item.group,
      htmlCode: item.htmlCode,
      uniCode: item.unicode,
    }));
  };

  return (
    <div className="justify-items-center">
      <BtnGetEmojis onClickSearch={loadAllData} />
      {isSearch ? (
        <EmojiCards emojis={emojiList} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>No hay</p>
        </div>
      )}
    </div>
  );
}

export default App;
