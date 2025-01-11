import React from "react";
import tw from "@/lib/twnrc";
import { FlatList, FlatListProps, View, ViewProps } from "react-native";
import { omit } from "lodash";
import { util } from "@/classes/util.class";

interface GridProps<T> extends Omit<FlatListProps<T>, "horizontal" | ""> {
  gap?: number;
  itemProps?: Omit<ViewProps, "children">;
}
const Grid = <T,>({
  data,
  gap = 2,
  numColumns = 2,
  columnWrapperStyle,
  itemProps = {},
  renderItem,
  ...rest
}: GridProps<T>) => {
  return (
    <FlatList
      horizontal={false}
      data={data}
      numColumns={numColumns}
      columnWrapperStyle={[tw`gap-x-${gap}`, columnWrapperStyle]}
      renderItem={(props) => (
        <View
          {...omit(itemProps?.style || {}, ["style"])}
          style={[
            tw.style({
              marginBottom: gap * 4,
              width: util.getGridWidth(numColumns, gap * 4),
            }),
            itemProps?.style,
          ]}>
          {renderItem?.(props)}
        </View>
      )}
      {...rest}
    />
  );
};

export default Grid;
