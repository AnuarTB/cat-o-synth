import './Names.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import Table from "./Table";
import { useState } from 'react';
import {Button, Radio, Space} from 'antd';
import bongo_cat from './images/bongo-cat-sticker.jpg';
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";

function Names() {
    return (
        <div className={'vertical'}>
            <Space direction={'vertical'} align={'center'} size={23}>
                <Text> Bongos </Text>
                <Space direction={'vertical'} align={'center'} size={3}>
                    <Text> Cowbell </Text>
                    <Text> Cymball </Text>
                    <Text> Meow </Text>
                    <Text> Tambourine </Text>
                    <Space direction={'vertical'} align={'center'} size={182}>
                        <Text> Piano </Text>
                        <Text> Marimba </Text>
                    </Space>
                </Space>
            </Space>

        </div>
    );
}

export default Names;
