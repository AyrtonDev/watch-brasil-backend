import { Pool, type PoolClient } from "pg";
import env from '../../env'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PostgreeHelper {
  private static pool: Pool;
  public static client: PoolClient | null = null;
  

  public static async connect(): Promise<void> {
      this.pool = new Pool(env);

      if (!this.client) {
          try {
              this.client = await this.pool.connect();
              console.log('🔥 Conectado ao PostgreSQL!');
          } catch (error) {
              console.error('❌ Erro ao conectar ao PostgreSQL:', error);
              throw new Error('Falha na conexão com o banco de dados.');
          }
      }
  }

  public static async disconnect(): Promise<void> {
      if (this.client) {
          this.client.release();
          this.client = null;
          console.log('⚡ Cliente do banco de dados liberado.');
          await this.pool.end();
          console.log('🔌 Conexão com o banco encerrada.');
      }
  }
}