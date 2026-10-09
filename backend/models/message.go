package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Message struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key" json:"id"`
	Name      string    `gorm:"not null" json:"name"`
	Email     string    `gorm:"not null" json:"email"`
	Content   string    `gorm:"type:text;not null" json:"content"`
	IsRead    bool      `gorm:"default:false" json:"is_read"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (m *Message) BeforeCreate(tx *gorm.DB) (err error) {
	m.ID = uuid.New()
	return
}
