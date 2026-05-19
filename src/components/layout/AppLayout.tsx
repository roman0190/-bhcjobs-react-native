import React from 'react';
import { View } from 'react-native';
import Header from '../Header';
import ManualMenu from '../ManualMenu';
type Props = {
  children: React.ReactNode;
  showHeader?: boolean;
  showMenu?: boolean;
};

export default function AppLayout({ children, showHeader = true,showMenu= true }: Props) {
  return (
    <View style={{ flex: 1 }}>
      {showHeader && <Header rightText="Sign In" />}
      <View style={{ flex: 1 }}>{children}</View>
      {showMenu && <ManualMenu />}
    </View>
  );
}
