import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { Screen, User as UserType } from '../App';

interface SettingsScreenProps {
  user: UserType | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function SettingsScreen({ user, onNavigate, onLogout }: SettingsScreenProps) {
  const handleLogout = () => {
    if (window.confirm('ログアウトしますか？')) {
      onLogout();
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('アカウントを削除しますか？この操作は取り消せません。')) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Settings className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-medium">設定</h1>
              <p className="text-muted-foreground">アカウント管理</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              プロフィール
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('profile-edit')}
              >
                編集
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="secondary">
                {user?.fitnessLevel === 'beginner' ? '初心者' : 
                 user?.fitnessLevel === 'intermediate' ? '中級者' : '上級者'}
              </Badge>
              {user?.age && (
                <Badge variant="secondary">
                  {user.age}歳
                </Badge>
              )}
            </div>
            
            {user?.goals && user.goals.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">目標</p>
                <div className="flex flex-wrap gap-1">
                  {user.goals.map((goal, index) => (
                    <Badge key={index} variant="outline">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle>アプリ設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">通知設定</p>
                  <p className="text-sm text-muted-foreground">
                    トレーニングリマインダーなど
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">プライバシー設定</p>
                  <p className="text-sm text-muted-foreground">
                    データの共有設定
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle>サポート</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">ヘルプ&amp;FAQ</p>
                  <p className="text-sm text-muted-foreground">
                    よくある質問と使い方
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">お問い合わせ</p>
                  <p className="text-sm text-muted-foreground">
                    サポートチームに連絡
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>アカウント</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              ログアウト
            </Button>
            
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleDeleteAccount}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              アカウントを削除
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="p-4 text-center">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                FitnessAI v1.0.0
              </p>
              <p className="text-xs text-muted-foreground">
                © 2024 FitnessAI. All rights reserved.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}