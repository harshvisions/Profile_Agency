package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Project struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key" json:"id"`
	Title       string    `gorm:"not null" json:"title"`
	Description string    `gorm:"type:text;not null" json:"description"`
	WebsiteURL  string    `json:"website_url"`
	VideoURL    string    `json:"video_url"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (p *Project) BeforeCreate(tx *gorm.DB) (err error) {
	p.ID = uuid.New()
	return
}
