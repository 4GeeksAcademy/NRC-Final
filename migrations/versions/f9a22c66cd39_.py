"""empty message

Revision ID: f9a22c66cd39
Revises: dd907e6df0c9
Create Date: 2024-05-02 17:18:03.098835

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9a22c66cd39'
down_revision = 'dd907e6df0c9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_profile', schema=None) as batch_op:
        batch_op.add_column(sa.Column('genre', sa.String(length=20), nullable=False))
        batch_op.drop_column('sex')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_profile', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sex', sa.VARCHAR(length=20), autoincrement=False, nullable=False))
        batch_op.drop_column('genre')

    # ### end Alembic commands ###