import React from 'react';
import { List, Datagrid, Edit, Create, 
        SimpleForm, DateField, TextField, EditButton, DisabledInput, NumberInput,BooleanInput,
        TextInput, LongTextInput, DateInput } from 'react-admin';

export const PromotionList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField label="Mã giảm giá" source="name"/>
            <TextField label="Chi tiết" source="description" />
            <TextField label="Số lần sử dụng" source="count" />
            <TextField label="Số tiền được trừ" source="minus" />
            <TextField label="Phần trăm" source="devide" />
            <TextField label="Ngày bắt đầu" source="beginAt" />
            <TextField label="Ngày kết thúc" source="endAt" />
            <TextField label="Khả dụng " source="enable" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const PromotionEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput label="Mã giảm giá" source="name"/>
            <LongTextInput label="Chi tiết" source="description" />
            <NumberInput label="Số lần sử dụng" source="count" />
            <NumberInput label="Số tiền được trừ" source="minus" />
            <NumberInput label="Phần trăm" source="devide" />
            <DateInput label="Ngày bắt đầu" source="beginAt" />
            <DateInput label="Ngày kết thúc" source="endAt" />
            <BooleanInput label="Khả dụng " source="enable" />
        </SimpleForm>
    </Edit>
);
export const PromotionCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Mã giảm giá" source="name"/>
            <LongTextInput label="Chi tiết" source="description" />
            <NumberInput label="Số lần sử dụng" source="count" />
            <NumberInput label="Số tiền được trừ" source="minus" />
            <NumberInput label="Phần trăm" source="devide"/>
            <DateInput label="Ngày bắt đầu" source="beginAt" />
            <DateInput label="Ngày kết thúc" source="endAt" />
            <BooleanInput label="Khả dụng " source="enable" />
        </SimpleForm>
    </Create>
);
