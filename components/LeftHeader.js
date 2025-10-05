
import { Text, TouchableOpacity } from 'react-native';

export function LeftHeader({navigation}) {
    

    return (
        <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                try {
                  const parent = navigation.getParent(); // get parent navigator (the Drawer)
                  if (parent && typeof parent.toggleDrawer === 'function') {
                    parent.toggleDrawer(); // preferred
                  } else if (parent) {
                    // fallback — dispatch drawer action to parent
                    parent.dispatch(DrawerActions.toggleDrawer());
                  } else {
                    // last resort: try to dispatch on current navigation (some setups)
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }
                } catch (e) {
                  console.warn('Could not toggle drawer:', e);
                }
              }}
            >
              <Text style={{ color: '#ef4444', fontSize: 24, marginRight: 10 }}>☰</Text>
            </TouchableOpacity>
    );
}
