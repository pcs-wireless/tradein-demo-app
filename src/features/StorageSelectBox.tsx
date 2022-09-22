import { FC, useEffect, useState } from "react";
import { Select, Spin } from "antd";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GET_MODELS_STORAGE } from "../services/query";
import { useQuery } from "@apollo/client";
import { selectStorage } from "../components/itemSlice";
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

const SotrageSelectBox: FC = () => {
  const dispatch = useAppDispatch();
  const { storage, manufacturer } = useAppSelector((state) => state.item);
  const { deviceId, manufacturerId, modelId } = useAppSelector(
    (state) => state.item.ids
  );

  const { loading, data } = useQuery(GET_MODELS_STORAGE, {
    variables: {
      deviceId: deviceId,
      manufacturerId: manufacturerId,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [isNull, setIsNull] = useState<boolean>(false);

  const modelStorage = data?.models?.filter(
    (storage: any) => storage.id === modelId
  );

  const copyStorageList = modelStorage && [...modelStorage[0]?.storages];
  const storageSort = copyStorageList?.sort(
    (a: { displayOrder: number }, b: { displayOrder: number }) => {
      return b.displayOrder - a.displayOrder;
    }
  );
  storageSort?.reverse();

  useEffect(() => {
    if (storage === null) document.getElementById("storage-not-null")?.click();
  }, [storage, manufacturer]);

  const handleChange = (name: any, option: any) => {
    setIsNull(false);
    dispatch(selectStorage({ name, id: option.key }));
  };

  return !isNull ? (
    <>
      <button id="storage-not-null" onClick={() => setIsNull(true)} hidden />
      <CustomSelect
        showSearch
        placeholder={<FormattedMessage id="SELECT_STORAGE" />}
        optionFilterProp="children"
        defaultValue={storage}
        onChange={handleChange}
        notFoundContent={loading ? <Spin size="small" /> : null}
        filterOption={(input: string, option: any) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {storageSort && !loading
          ? storageSort.map((item: { id: number; name: string }) => {
              return (
                <Option key={item.id} value={item.name}>
                  {item.name}
                </Option>
              );
            })
          : ""}
      </CustomSelect>
    </>
  ) : (
    <CustomSelect
      showSearch
      placeholder={<FormattedMessage id="SELECT_STORAGE" />}
      optionFilterProp="children"
      onChange={handleChange}
      notFoundContent={loading ? <Spin size="small" /> : null}
      filterOption={(input: string, option: any) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {storageSort && !loading
        ? storageSort.map((item: { id: number; name: string }) => {
            return (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            );
          })
        : ""}
    </CustomSelect>
  );
};

export default SotrageSelectBox;
