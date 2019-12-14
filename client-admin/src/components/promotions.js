import React from 'react';
import { List, Datagrid, Edit, Create, 
        SimpleForm, DateField, TextField, EditButton, DisabledInput, NumberInput,BooleanInput,
        TextInput, LongTextInput, DateInput, Filter, required, number, minValue } from 'react-admin';

const vaildatesNumber1 = [number('Nhập số'), minValue(0)]
const vaildatesNumber2 = [required('Không được bỏ trống!'), number('Nhập số'), minValue(0)]
const PromotionFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Mã giảm giá" source="name" alwaysOn />
    </Filter>
);

export const PromotionList = (props) => (
    <List {...props} filters = {<PromotionFilter/>} >
        <Datagrid>
            <TextField label="Mã giảm giá" source="name" />
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
            <NumberInput label="Số lần sử dụng" source="count" validate={vaildatesNumber2} />
            <NumberInput label="Số mã còn lại" source="total" validate={vaildatesNumber1}/>
            <NumberInput label="Trừ theo số tiền: số tiền được trừ" source="minus" validate={vaildatesNumber1} />
            <NumberInput label="Trừ theo phần trăm" source="devide" validate={vaildatesNumber1} />
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
            <NumberInput label="Số lần sử dụng" source="count" validate={vaildatesNumber2} defaultValue = {1}/>
            <NumberInput label="Số mã còn lại" source="total" validate={vaildatesNumber1}/>
            <NumberInput label="Trừ theo số tiền: số tiền được trừ" source="minus" validate={vaildatesNumber1} defaultValue = {0}/>
            <NumberInput label="Trừ theo phần trăm" source="devide" validate={vaildatesNumber1} defaultValue = {1}/>
            <DateInput label="Ngày bắt đầu" source="beginAt" />
            <DateInput label="Ngày kết thúc" source="endAt" />
            <BooleanInput label="Khả dụng " source="enable" />
        </SimpleForm>
    </Create>
);
