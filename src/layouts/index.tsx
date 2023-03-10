import React, {useState} from "react";
import {Divider, message, Select} from 'antd';
import TextArea from "antd/es/input/TextArea";
import {Option} from "rc-select";
import styles from './index.less'
import SearchBtn from "@/components/SearchBtn";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark, tomorrow, twilight, pojoaque} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {MOCK_DATA, NLP_URL} from "@/constant";
import {getData} from "@/service/api";

function SearchBox() {
    const [data, setData] = useState<string[]>([]);//展示数据
    const [searchContent, setSearchContent] = useState()//搜索内容
    const [type, setType] = useState<string>('python')//搜索语言类型

    const fetchData = async () => {
        console.log(66)
        if (type === undefined) {
            message.error("请选择语言类型");
        } else if (searchContent === undefined || searchContent==='') {
            message.error("请输入搜索内容");
        } else if (NLP_URL === '') {
            //假数据展示
            setData(MOCK_DATA)

        } else {
            //todo 此处根据返回的数据情况赋值给data进行展示
            const response = await getData({searchContent, type})
        }
    }

    const typeChange = (type: string) => {
        console.log(type)
        setType(type)
    }
    const contentChange = (searchContent: any) => {
        console.log(searchContent.currentTarget.value)
        setSearchContent(searchContent.currentTarget.value)
    }

    return (
        <div className={styles.main}>

            {/*引擎顶部logo*/}
            <div className={styles.logo}>
                <div className={styles.loader}>
                    <span className={styles.text}>Code Search Engine</span>
                    <span className={styles.load}></span>
                </div>
            </div>

            {/*搜索区域*/}
            <div className={styles.searchBox}>
                <Select defaultValue="python" style={{width: '10%',}} onChange={typeChange}>
                    {/*   <Option children={}></Option>*/}
                    <Option value="python">python</Option>
                    <Option value="sql">sql</Option>
                </Select>
                <TextArea
                    style={{width: '50%', marginRight: 20, borderRadius: 20}}
                    autoSize={{minRows: 2, maxRows: 10}}
                    placeholder="在此处输入"
                    onChange={contentChange}
                />
                <SearchBtn onclick={fetchData}/>
            </div>
            <Divider/>

            {/*结果展示区域*/}
            <div className={styles.result}>
                {data.map((item, index) => {
                    return (<div>
                        <p>result {index + 1}</p>
                        <SyntaxHighlighter language="javascript" style={index % 2 === 0 ? dark : tomorrow}>
                            {item}
                        </SyntaxHighlighter>
                        <Divider/>
                    </div>)
                })}


                {/*  <p>result 1</p>
                <SyntaxHighlighter language="javascript" style={dark}>{"func = lambda size, kernel=3, stride=1, padding=0: ((size - kernel + 2 * padding) / stride + 1)\n" +
                    "        x = func(func(self.options[1]), kernel=2)\n" +
                    "        x = func(func(x), kernel=2)\n" +
                    "        x = func(func(x), kernel=2)\n" +
                    "        x = func(func(x), kernel=2)\n" +
                    "        y = func(func(self.options[2]), kernel=2)\n" +
                    "        y = func(func(y), kernel=2)\n" +
                    "        y = func(func(y), kernel=2)\n" +
                    "        y = func(func(y), kernel=2)\n" +
                    "        x = int(x)\n" +
                    "        y = int(y)\n"}
                </SyntaxHighlighter>
                <Divider/>*/}
            </div>
        </div>
    );
}


export default SearchBox;
