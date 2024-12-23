'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Inbox as InboxIcon,
  Star as StarIcon,
  Send as SendIcon,
  Drafts as DraftsIcon,
  Mail as MailIcon,
  Delete as DeleteIcon,
  Report as SpamIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

// ダミーデータの型定義
interface ListItem {
  id: number;
  url: string;
  comment1: string;
  comment2: string;
}

// ダミーデータ
const dummyData: ListItem[] = [
  {
    id: 1,
    url: 'https://example.com/page1',
    comment1: 'とても参考になるサイトです',
    comment2: '定期的にチェックしたい'
  },
  {
    id: 2,
    url: 'https://example.com/page2',
    comment1: '技術記事が充実している',
    comment2: 'ブックマークに追加済み'
  },
  {
    id: 3,
    url: 'https://example.com/page3',
    comment1: 'チュートリアルが分かりやすい',
    comment2: '初心者にもおすすめ'
  },
];

const drawerWidth = 240;

interface EditDialogProps {
  open: boolean;
  item: ListItem | null;
  onClose: () => void;
  onSave: (editedItem: ListItem) => void;
}

// 詳細ダイアログのコンポーネント
function EditDialog({ open, item, onClose, onSave }: EditDialogProps) {
  const [editedItem, setEditedItem] = useState<ListItem | null>(null);

  // itemが変更されたときにeditedItemを更新
  useEffect(() => {
    if (item) {
      setEditedItem(item);
    }
  }, [item]);

  const handleSave = () => {
    if (editedItem) {
      onSave(editedItem);
      onClose();
    }
  };

  // editedItemがnullの場合は早期リターンする
  if (!editedItem) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle>詳細編集</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="url"
            fullWidth
            value={editedItem.url}
            onChange={(e) => setEditedItem({ ...editedItem, url: e.target.value })}
          />
          <TextField
            margin="dense"
            label="コメント1"
            fullWidth
            value={editedItem.comment1}
            onChange={(e) => setEditedItem({ ...editedItem, comment1: e.target.value })}
          />
          <TextField
            margin="dense"
            label="コメント2"
            fullWidth
            value={editedItem.comment2}
            onChange={(e) => setEditedItem({ ...editedItem, comment2: e.target.value })}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Home() {
  const [data, setData] = useState<ListItem[]>(dummyData);
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (item: ListItem) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setOpenDialog(false);
  };

  const handleSave = (editedItem: ListItem) => {
    setData(data.map(item => 
      item.id === editedItem.id ? editedItem : item
    ));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#1976d2'
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            marginTop: '64px' 
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Send email" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="All mail" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SpamIcon />
            </ListItemIcon>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="lg">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="URL list table">
              <TableHead>
                <TableRow>
                  <TableCell>URL</TableCell>
                  <TableCell>コメント1</TableCell>
                  <TableCell>コメント2</TableCell>
                  <TableCell align="center">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.url}
                      </a>
                    </TableCell>
                    <TableCell>{item.comment1}</TableCell>
                    <TableCell>{item.comment2}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(item)}
                      >
                        詳細
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <EditDialog
        open={openDialog}
        item={selectedItem}
        onClose={handleClose}
        onSave={handleSave}
      />
    </Box>
  );
}
