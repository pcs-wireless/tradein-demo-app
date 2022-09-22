import { FC, useEffect, useState } from "react";
import { Select, Spin } from "antd";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GET_MODELS } from "../services/query";
import { useQuery } from "@apollo/client";
import { getPartnerId } from "../utils";
import {
  selectModel,
  resetQuotationDetailsExceptModel,
} from "../components/itemSlice";
import { mq } from "../assets/mediaQueries";
import { FormattedMessage } from "react-intl";

const { Option } = Select;

const CustomSelect = styled(Select)(
  mq({
    width: ["100%", 598],
    height: 45,
    ".ant-select-selector": {
      height: "45px !important",
      display: "flex",
      alignItems: "center",
    },
    ".ant-select-selection-search-input": {
      height: "45px !important",
    },
  })
);

const ModelSelectBox: FC = () => {
  const dispatch = useAppDispatch();
  const { model, manufacturer } = useAppSelector((state) => state.item);
  const { deviceId, manufacturerId } = useAppSelector(
    (state) => state.item.ids
  );
  const { loading, data } = useQuery(GET_MODELS, {
    variables: {
      partnerId: getPartnerId(),
      deviceId: deviceId,
      manufacturerId: manufacturerId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [isNull, setIsNull] = useState<boolean>(false);

  const handleChange = (name: any, option: any) => {
    setIsNull(false);
    if (model && model !== name) dispatch(resetQuotationDetailsExceptModel());
    dispatch(
      selectModel({
        name,
        id: option.key,
        image: option?.image?.mediumSizeSourceURL || null,
      })
    );
  };

  useEffect(() => {
    if (model === null) document.getElementById("model-not-null")?.click();
  }, [model, manufacturer]);

  return !isNull ? (
    <>
      <button id="model-not-null" onClick={() => setIsNull(true)} hidden />
      <CustomSelect
        showSearch
        placeholder={<FormattedMessage id="SELECT_MODEL" />}
        optionFilterProp="children"
        defaultValue={model}
        onChange={handleChange}
        notFoundContent={loading ? <Spin size="small" /> : null}
        filterOption={(input: string, option: any) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {data && !loading
          ? data?.models?.map(
              (item: { id: number; name: string; nickName: string }) => {
                return (
                  <Option key={item.id} value={item.name}>
                    {item.nickName}
                  </Option>
                );
              }
            )
          : ""}
      </CustomSelect>
    </>
  ) : (
    <CustomSelect
      showSearch
      placeholder={<FormattedMessage id="SELECT_MODEL" />}
      optionFilterProp="children"
      onChange={handleChange}
      notFoundContent={loading ? <Spin size="small" /> : null}
      filterOption={(input: string, option: any) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {data && !loading
        ? data?.models?.map(
            (item: {
              id: number;
              name: string;
              nickName: string;
              image: [];
            }) => {
              return (
                <Option key={item.id} image={item.image} value={item.name}>
                  {item.nickName}
                </Option>
              );
            }
          )
        : ""}
    </CustomSelect>
  );
};

export default ModelSelectBox;
