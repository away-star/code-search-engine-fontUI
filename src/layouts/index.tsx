import React, {useState} from "react";
import {Divider, message, Select} from 'antd';
import TextArea from "antd/es/input/TextArea";
import {Option} from "rc-select";
import styles from './index.less'
import SearchBtn from "@/components/SearchBtn";
import ResultBut from "@/components/ResultBut";
import ResultBut1 from "@/components/ResultBut1";
import PerBut from "@/components/PerBut";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {
    dark,
    tomorrow,
    twilight,
    pojoaque,
    darcula,
    coldarkCold,
    gruvboxLight
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {MOCK_DATA, MOCK_DATA_python_merge, MOCK_DATA_python_sys, NLP_URL} from "@/constant";
import {getData} from "@/service/api";

function verifyData(oldData: string[]) {
    let newData: CodeData[] = [];
   // let similarity: number[] = [];

    for (let i = 0; i < oldData.length; i++) {
        //console.log(oldData[i])
        //对数据进行处理
        let startQuoteIndex: number = oldData[i].indexOf(",");  // 查找第一个单引号的位置
        let endQuoteIndex: number = oldData[i].lastIndexOf(",");  // 查找最后一个单引号的位置
        //console.log(oldData[i].slice(startQuoteIndex + 1, endQuoteIndex))
        newData[i] = {code: '', similar: ''};
        newData[i].code = oldData[i].slice(startQuoteIndex + 1, endQuoteIndex);
        newData[i].code = newData[i].code.substring(1, newData[i].code.length - 1);
        newData[i].code = newData[i].code.substring(1, newData[i].code.length - 1);
        newData[i].code = newData[i].code.replace(/\\n/g, "\n");
        newData[i].code = newData[i].code.replace(/\\+$/, "");
        newData[i].code = newData[i].code.trim();

        //计算相似度
        // console.log(oldData[i].slice(endQuoteIndex+2, oldData[i].length-1))
        const xxx: CodeData = {
            code: newData[i].code,
            similar: ((100-(+oldData[i].slice(endQuoteIndex + 2, oldData[i].length - 1))*100).toString().slice(0,6))+'%'
        }
       // console.log(1-(+xxx.similar));
        newData[i]=xxx;
    }
    return newData;
}


function codeStyle(index: number) {
    switch (index % 8) {
        case 0:
            return dark;
        case 1:
            return tomorrow;
        case 2:
            return twilight;
        case 3:
            return pojoaque;
        case 4:
            return tomorrow;
        case 5:
            return darcula;
        case 6:
            return coldarkCold;
        case 7:
            return gruvboxLight;
        default:
            return tomorrow;
    }
}

export interface CodeData {
    code: string;
    similar: string
}

function SearchBox() {
    const [data, setData] = useState<CodeData[]>();//展示数据
    const [searchContent, setSearchContent] = useState()//搜索内容
    const [type, setType] = useState<string>('python')//搜索语言类型

    const fetchData = async () => {
        console.log(66)
        if (type === undefined) {
            message.error("请选择语言类型");
        } else if (searchContent === undefined || searchContent === '') {
            message.error("请输入搜索内容");
        } else if (NLP_URL === undefined) {
            //假数据展示
            //setData('def apply_something(something, config, some_var):\n    pass  # ...\n\nimport functools\n\nreduce(functools.partial(apply_something, some_var=True), \n       [1, 2, 3], something_initializer)\n')

        } else {
            //todo 此处根据返回的数据情况赋值给data进行展示
            const response = await getData({searchContent, type})
            //setData(response.data)
            setData(verifyData(response.data))
            //setData(MOCK_DATA_python_sys)
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
                <TextArea
                    style={{width: '50%', marginRight: 20, borderRadius: 20}}
                    autoSize={{minRows: 2, maxRows: 10}}
                    placeholder="在此处输入"
                    onChange={contentChange}
                />
                <SearchBtn onclick={fetchData}/>
            </div>
            <div className={styles.searchBox}>
                <Select defaultValue="python" style={{width: '10%', marginRight: 10, marginBottom: 20}}
                        onChange={typeChange}>
                    {/*   <Option children={}></Option>*/}
                    <Option value="python">python</Option>
                    <Option value="sql">sql</Option>
                </Select>
            </div>
            <Divider/>

            {/*结果展示区域*/}
            <div className={styles.result}>
                {data?.map((item, index) => {
                        return (
                            <div style={{whiteSpace: "pre-wrap"}}>
                                <div className={styles.head}>
                                    <ResultBut1 text={"result " + (index + 1)}/>
                                    {/*<span>result {index + 1}</span>*/}
                                    <PerBut text={item.similar}/>
                                </div>
                                <SyntaxHighlighter
                                    //className={styles.codeLine}
                                    language="python" style={codeStyle(index)}>
                                    {item.code}
                                </SyntaxHighlighter>
                                <Divider/>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    );
}


export default SearchBox;
