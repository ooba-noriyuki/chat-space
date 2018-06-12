# readmeにDB設計内容を記載

## usersテーブル

### Table Definition
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false,uniqe: true|
|password|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

## messagesテーブル

### Table Definition
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foregin_key: true|
|timestamps|datetime|null: false|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

### Table Definition
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user_id|references|null: false, foreign_key: true|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

## membersテーブル

### userとgroupの中間テーブル
### Table Definition
|Column|Type|Options|
|------|----|-------|
|users_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
