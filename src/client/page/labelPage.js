import React from "react";
import LabelStudioWrapper from '../component/labelPage/LabelStudio'
import { Typography } from 'antd'

const { Title } = Typography;

export default function LabelPage() {
  return (
    <div>
      <Title>LabelStudio</Title>
      <LabelStudioWrapper />
    </div>
  );
}