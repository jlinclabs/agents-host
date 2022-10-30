
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: number
  createdAt: Date
  email: string | null
  passwordSalt: string | null
  passwordHash: string | null
  did: string
  didSecret: string
  vaultKey: string
}

/**
 * Model Session
 * 
 */
export type Session = {
  id: string
  createdAt: Date
  lastSeenAt: Date
  userId: number | null
}

/**
 * Model Notification
 * 
 */
export type Notification = {
  id: number
  createdAt: Date
  userId: number
  type: string
  payload: Prisma.JsonValue
}

/**
 * Model LoginAttempt
 * 
 */
export type LoginAttempt = {
  id: string
  createdAt: Date
  userId: number
  host: string
  accepted: boolean
  resolved: boolean
}

/**
 * Model DocumentEvent
 * 
 */
export type DocumentEvent = {
  id: number
  occuredAt: Date
  documentId: string
  userId: number
  value: Prisma.JsonValue
}

/**
 * Model Document
 * 
 */
export type Document = {
  id: string
  version: number
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
  userId: number
  value: Prisma.JsonValue
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<GlobalReject>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<GlobalReject>;

  /**
   * `prisma.loginAttempt`: Exposes CRUD operations for the **LoginAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoginAttempts
    * const loginAttempts = await prisma.loginAttempt.findMany()
    * ```
    */
  get loginAttempt(): Prisma.LoginAttemptDelegate<GlobalReject>;

  /**
   * `prisma.documentEvent`: Exposes CRUD operations for the **DocumentEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentEvents
    * const documentEvents = await prisma.documentEvent.findMany()
    * ```
    */
  get documentEvent(): Prisma.DocumentEventDelegate<GlobalReject>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.4.0
   * Query Engine version: f352a33b70356f46311da8b00d83386dd9f145d6
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Notification: 'Notification',
    LoginAttempt: 'LoginAttempt',
    DocumentEvent: 'DocumentEvent',
    Document: 'Document'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    sessions: number
    notifications: number
    loginAttempts: number
    documents: number
  }

  export type UserCountOutputTypeSelect = {
    sessions?: boolean
    notifications?: boolean
    loginAttempts?: boolean
    documents?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    email: string | null
    passwordSalt: string | null
    passwordHash: string | null
    did: string | null
    didSecret: string | null
    vaultKey: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    email: string | null
    passwordSalt: string | null
    passwordHash: string | null
    did: string | null
    didSecret: string | null
    vaultKey: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    email: number
    passwordSalt: number
    passwordHash: number
    did: number
    didSecret: number
    vaultKey: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    passwordSalt?: true
    passwordHash?: true
    did?: true
    didSecret?: true
    vaultKey?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    passwordSalt?: true
    passwordHash?: true
    did?: true
    didSecret?: true
    vaultKey?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    passwordSalt?: true
    passwordHash?: true
    did?: true
    didSecret?: true
    vaultKey?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    createdAt: Date
    email: string | null
    passwordSalt: string | null
    passwordHash: string | null
    did: string
    didSecret: string
    vaultKey: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    createdAt?: boolean
    email?: boolean
    passwordSalt?: boolean
    passwordHash?: boolean
    did?: boolean
    didSecret?: boolean
    vaultKey?: boolean
    sessions?: boolean | SessionFindManyArgs
    notifications?: boolean | NotificationFindManyArgs
    loginAttempts?: boolean | LoginAttemptFindManyArgs
    documents?: boolean | DocumentFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    sessions?: boolean | SessionFindManyArgs
    notifications?: boolean | NotificationFindManyArgs
    loginAttempts?: boolean | LoginAttemptFindManyArgs
    documents?: boolean | DocumentFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'sessions' ? Array < SessionGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'notifications' ? Array < NotificationGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'loginAttempts' ? Array < LoginAttemptGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'documents' ? Array < DocumentGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'sessions' ? Array < SessionGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'notifications' ? Array < NotificationGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'loginAttempts' ? Array < LoginAttemptGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'documents' ? Array < DocumentGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    sessions<T extends SessionFindManyArgs = {}>(args?: Subset<T, SessionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Session>| Null>, PrismaPromise<Array<SessionGetPayload<T>>| Null>>;

    notifications<T extends NotificationFindManyArgs = {}>(args?: Subset<T, NotificationFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Notification>| Null>, PrismaPromise<Array<NotificationGetPayload<T>>| Null>>;

    loginAttempts<T extends LoginAttemptFindManyArgs = {}>(args?: Subset<T, LoginAttemptFindManyArgs>): CheckSelect<T, PrismaPromise<Array<LoginAttempt>| Null>, PrismaPromise<Array<LoginAttemptGetPayload<T>>| Null>>;

    documents<T extends DocumentFindManyArgs = {}>(args?: Subset<T, DocumentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Document>| Null>, PrismaPromise<Array<DocumentGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Session
   */


  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    userId: number | null
  }

  export type SessionSumAggregateOutputType = {
    userId: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    lastSeenAt: Date | null
    userId: number | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    lastSeenAt: Date | null
    userId: number | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    createdAt: number
    lastSeenAt: number
    userId: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    userId?: true
  }

  export type SessionSumAggregateInputType = {
    userId?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    createdAt?: true
    lastSeenAt?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    lastSeenAt?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    createdAt?: true
    lastSeenAt?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs = {
    /**
     * Filter which Session to aggregate.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs = {
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByWithAggregationInput>
    by: Array<SessionScalarFieldEnum>
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }


  export type SessionGroupByOutputType = {
    id: string
    createdAt: Date
    lastSeenAt: Date
    userId: number | null
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect = {
    id?: boolean
    createdAt?: boolean
    lastSeenAt?: boolean
    user?: boolean | UserArgs
    userId?: boolean
  }

  export type SessionInclude = {
    user?: boolean | UserArgs
  }

  export type SessionGetPayload<
    S extends boolean | null | undefined | SessionArgs,
    U = keyof S
      > = S extends true
        ? Session
    : S extends undefined
    ? never
    : S extends SessionArgs | SessionFindManyArgs
    ?'include' extends U
    ? Session  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof Session ? Session[P] : never
  } 
    : Session
  : Session


  type SessionCountArgs = Merge<
    Omit<SessionFindManyArgs, 'select' | 'include'> & {
      select?: SessionCountAggregateInputType | true
    }
  >

  export interface SessionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SessionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SessionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Session'> extends True ? CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>> : CheckSelect<T, Prisma__SessionClient<Session | null, null>, Prisma__SessionClient<SessionGetPayload<T> | null, null>>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SessionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SessionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Session'> extends True ? CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>> : CheckSelect<T, Prisma__SessionClient<Session | null, null>, Prisma__SessionClient<SessionGetPayload<T> | null, null>>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Session>>, PrismaPromise<Array<SessionGetPayload<T>>>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
    **/
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Create many Sessions.
     *     @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     *     @example
     *     // Create many Sessions
     *     const session = await prisma.session.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
    **/
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
    **/
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Find one Session that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SessionFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Find the first Session that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SessionClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Session base type for findUnique actions
   */
  export type SessionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where: SessionWhereUniqueInput
  }

  /**
   * Session: findUnique
   */
  export interface SessionFindUniqueArgs extends SessionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session base type for findFirst actions
   */
  export type SessionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     * 
    **/
    distinct?: Enumerable<SessionScalarFieldEnum>
  }

  /**
   * Session: findFirst
   */
  export interface SessionFindFirstArgs extends SessionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session findMany
   */
  export type SessionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Sessions to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session create
   */
  export type SessionCreateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to create a Session.
     * 
    **/
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }


  /**
   * Session createMany
   */
  export type SessionCreateManyArgs = {
    /**
     * The data used to create many Sessions.
     * 
    **/
    data: Enumerable<SessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Session update
   */
  export type SessionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to update a Session.
     * 
    **/
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs = {
    /**
     * The data used to update Sessions.
     * 
    **/
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     * 
    **/
    where?: SessionWhereInput
  }


  /**
   * Session upsert
   */
  export type SessionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The filter to search for the Session to update in case it exists.
     * 
    **/
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     * 
    **/
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }


  /**
   * Session delete
   */
  export type SessionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter which Session to delete.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs = {
    /**
     * Filter which Sessions to delete
     * 
    **/
    where?: SessionWhereInput
  }


  /**
   * Session: findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs = SessionFindUniqueArgsBase
      

  /**
   * Session: findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs = SessionFindFirstArgsBase
      

  /**
   * Session without action
   */
  export type SessionArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
  }



  /**
   * Model Notification
   */


  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    userId: number | null
    type: string | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    userId: number | null
    type: string | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    type: number
    payload: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    type?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    type?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    type?: true
    payload?: true
    _all?: true
  }

  export type NotificationAggregateArgs = {
    /**
     * Filter which Notification to aggregate.
     * 
    **/
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     * 
    **/
    orderBy?: Enumerable<NotificationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs = {
    where?: NotificationWhereInput
    orderBy?: Enumerable<NotificationOrderByWithAggregationInput>
    by: Array<NotificationScalarFieldEnum>
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }


  export type NotificationGroupByOutputType = {
    id: number
    createdAt: Date
    userId: number
    type: string
    payload: JsonValue
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = PrismaPromise<
    Array<
      PickArray<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect = {
    id?: boolean
    createdAt?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    type?: boolean
    payload?: boolean
  }

  export type NotificationInclude = {
    user?: boolean | UserArgs
  }

  export type NotificationGetPayload<
    S extends boolean | null | undefined | NotificationArgs,
    U = keyof S
      > = S extends true
        ? Notification
    : S extends undefined
    ? never
    : S extends NotificationArgs | NotificationFindManyArgs
    ?'include' extends U
    ? Notification  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Notification ? Notification[P] : never
  } 
    : Notification
  : Notification


  type NotificationCountArgs = Merge<
    Omit<NotificationFindManyArgs, 'select' | 'include'> & {
      select?: NotificationCountAggregateInputType | true
    }
  >

  export interface NotificationDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NotificationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NotificationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Notification'> extends True ? CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>> : CheckSelect<T, Prisma__NotificationClient<Notification | null, null>, Prisma__NotificationClient<NotificationGetPayload<T> | null, null>>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NotificationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NotificationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Notification'> extends True ? CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>> : CheckSelect<T, Prisma__NotificationClient<Notification | null, null>, Prisma__NotificationClient<NotificationGetPayload<T> | null, null>>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends NotificationFindManyArgs>(
      args?: SelectSubset<T, NotificationFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Notification>>, PrismaPromise<Array<NotificationGetPayload<T>>>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
    **/
    create<T extends NotificationCreateArgs>(
      args: SelectSubset<T, NotificationCreateArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Create many Notifications.
     *     @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     *     @example
     *     // Create many Notifications
     *     const notification = await prisma.notification.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends NotificationCreateManyArgs>(
      args?: SelectSubset<T, NotificationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
    **/
    delete<T extends NotificationDeleteArgs>(
      args: SelectSubset<T, NotificationDeleteArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NotificationUpdateArgs>(
      args: SelectSubset<T, NotificationUpdateArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NotificationDeleteManyArgs>(
      args?: SelectSubset<T, NotificationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NotificationUpdateManyArgs>(
      args: SelectSubset<T, NotificationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
    **/
    upsert<T extends NotificationUpsertArgs>(
      args: SelectSubset<T, NotificationUpsertArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Find one Notification that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, NotificationFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Find the first Notification that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, NotificationFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NotificationClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Notification base type for findUnique actions
   */
  export type NotificationFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * Filter, which Notification to fetch.
     * 
    **/
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification: findUnique
   */
  export interface NotificationFindUniqueArgs extends NotificationFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Notification base type for findFirst actions
   */
  export type NotificationFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * Filter, which Notification to fetch.
     * 
    **/
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     * 
    **/
    orderBy?: Enumerable<NotificationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     * 
    **/
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     * 
    **/
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }

  /**
   * Notification: findFirst
   */
  export interface NotificationFindFirstArgs extends NotificationFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * Filter, which Notifications to fetch.
     * 
    **/
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     * 
    **/
    orderBy?: Enumerable<NotificationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     * 
    **/
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     * 
    **/
    skip?: number
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }


  /**
   * Notification create
   */
  export type NotificationCreateArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * The data needed to create a Notification.
     * 
    **/
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }


  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs = {
    /**
     * The data used to create many Notifications.
     * 
    **/
    data: Enumerable<NotificationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Notification update
   */
  export type NotificationUpdateArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * The data needed to update a Notification.
     * 
    **/
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     * 
    **/
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs = {
    /**
     * The data used to update Notifications.
     * 
    **/
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     * 
    **/
    where?: NotificationWhereInput
  }


  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * The filter to search for the Notification to update in case it exists.
     * 
    **/
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     * 
    **/
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }


  /**
   * Notification delete
   */
  export type NotificationDeleteArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * Filter which Notification to delete.
     * 
    **/
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs = {
    /**
     * Filter which Notifications to delete
     * 
    **/
    where?: NotificationWhereInput
  }


  /**
   * Notification: findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs = NotificationFindUniqueArgsBase
      

  /**
   * Notification: findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs = NotificationFindFirstArgsBase
      

  /**
   * Notification without action
   */
  export type NotificationArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
  }



  /**
   * Model LoginAttempt
   */


  export type AggregateLoginAttempt = {
    _count: LoginAttemptCountAggregateOutputType | null
    _avg: LoginAttemptAvgAggregateOutputType | null
    _sum: LoginAttemptSumAggregateOutputType | null
    _min: LoginAttemptMinAggregateOutputType | null
    _max: LoginAttemptMaxAggregateOutputType | null
  }

  export type LoginAttemptAvgAggregateOutputType = {
    userId: number | null
  }

  export type LoginAttemptSumAggregateOutputType = {
    userId: number | null
  }

  export type LoginAttemptMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: number | null
    host: string | null
    accepted: boolean | null
    resolved: boolean | null
  }

  export type LoginAttemptMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: number | null
    host: string | null
    accepted: boolean | null
    resolved: boolean | null
  }

  export type LoginAttemptCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    host: number
    accepted: number
    resolved: number
    _all: number
  }


  export type LoginAttemptAvgAggregateInputType = {
    userId?: true
  }

  export type LoginAttemptSumAggregateInputType = {
    userId?: true
  }

  export type LoginAttemptMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    host?: true
    accepted?: true
    resolved?: true
  }

  export type LoginAttemptMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    host?: true
    accepted?: true
    resolved?: true
  }

  export type LoginAttemptCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    host?: true
    accepted?: true
    resolved?: true
    _all?: true
  }

  export type LoginAttemptAggregateArgs = {
    /**
     * Filter which LoginAttempt to aggregate.
     * 
    **/
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     * 
    **/
    orderBy?: Enumerable<LoginAttemptOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoginAttempts
    **/
    _count?: true | LoginAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoginAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoginAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoginAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoginAttemptMaxAggregateInputType
  }

  export type GetLoginAttemptAggregateType<T extends LoginAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateLoginAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoginAttempt[P]>
      : GetScalarType<T[P], AggregateLoginAttempt[P]>
  }




  export type LoginAttemptGroupByArgs = {
    where?: LoginAttemptWhereInput
    orderBy?: Enumerable<LoginAttemptOrderByWithAggregationInput>
    by: Array<LoginAttemptScalarFieldEnum>
    having?: LoginAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoginAttemptCountAggregateInputType | true
    _avg?: LoginAttemptAvgAggregateInputType
    _sum?: LoginAttemptSumAggregateInputType
    _min?: LoginAttemptMinAggregateInputType
    _max?: LoginAttemptMaxAggregateInputType
  }


  export type LoginAttemptGroupByOutputType = {
    id: string
    createdAt: Date
    userId: number
    host: string
    accepted: boolean
    resolved: boolean
    _count: LoginAttemptCountAggregateOutputType | null
    _avg: LoginAttemptAvgAggregateOutputType | null
    _sum: LoginAttemptSumAggregateOutputType | null
    _min: LoginAttemptMinAggregateOutputType | null
    _max: LoginAttemptMaxAggregateOutputType | null
  }

  type GetLoginAttemptGroupByPayload<T extends LoginAttemptGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LoginAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoginAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoginAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], LoginAttemptGroupByOutputType[P]>
        }
      >
    >


  export type LoginAttemptSelect = {
    id?: boolean
    createdAt?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    host?: boolean
    accepted?: boolean
    resolved?: boolean
  }

  export type LoginAttemptInclude = {
    user?: boolean | UserArgs
  }

  export type LoginAttemptGetPayload<
    S extends boolean | null | undefined | LoginAttemptArgs,
    U = keyof S
      > = S extends true
        ? LoginAttempt
    : S extends undefined
    ? never
    : S extends LoginAttemptArgs | LoginAttemptFindManyArgs
    ?'include' extends U
    ? LoginAttempt  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof LoginAttempt ? LoginAttempt[P] : never
  } 
    : LoginAttempt
  : LoginAttempt


  type LoginAttemptCountArgs = Merge<
    Omit<LoginAttemptFindManyArgs, 'select' | 'include'> & {
      select?: LoginAttemptCountAggregateInputType | true
    }
  >

  export interface LoginAttemptDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one LoginAttempt that matches the filter.
     * @param {LoginAttemptFindUniqueArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LoginAttemptFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LoginAttemptFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LoginAttempt'> extends True ? CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T>>> : CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt | null, null>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T> | null, null>>

    /**
     * Find the first LoginAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptFindFirstArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LoginAttemptFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LoginAttemptFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LoginAttempt'> extends True ? CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T>>> : CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt | null, null>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T> | null, null>>

    /**
     * Find zero or more LoginAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoginAttempts
     * const loginAttempts = await prisma.loginAttempt.findMany()
     * 
     * // Get first 10 LoginAttempts
     * const loginAttempts = await prisma.loginAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loginAttemptWithIdOnly = await prisma.loginAttempt.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LoginAttemptFindManyArgs>(
      args?: SelectSubset<T, LoginAttemptFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<LoginAttempt>>, PrismaPromise<Array<LoginAttemptGetPayload<T>>>>

    /**
     * Create a LoginAttempt.
     * @param {LoginAttemptCreateArgs} args - Arguments to create a LoginAttempt.
     * @example
     * // Create one LoginAttempt
     * const LoginAttempt = await prisma.loginAttempt.create({
     *   data: {
     *     // ... data to create a LoginAttempt
     *   }
     * })
     * 
    **/
    create<T extends LoginAttemptCreateArgs>(
      args: SelectSubset<T, LoginAttemptCreateArgs>
    ): CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T>>>

    /**
     * Create many LoginAttempts.
     *     @param {LoginAttemptCreateManyArgs} args - Arguments to create many LoginAttempts.
     *     @example
     *     // Create many LoginAttempts
     *     const loginAttempt = await prisma.loginAttempt.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LoginAttemptCreateManyArgs>(
      args?: SelectSubset<T, LoginAttemptCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a LoginAttempt.
     * @param {LoginAttemptDeleteArgs} args - Arguments to delete one LoginAttempt.
     * @example
     * // Delete one LoginAttempt
     * const LoginAttempt = await prisma.loginAttempt.delete({
     *   where: {
     *     // ... filter to delete one LoginAttempt
     *   }
     * })
     * 
    **/
    delete<T extends LoginAttemptDeleteArgs>(
      args: SelectSubset<T, LoginAttemptDeleteArgs>
    ): CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T>>>

    /**
     * Update one LoginAttempt.
     * @param {LoginAttemptUpdateArgs} args - Arguments to update one LoginAttempt.
     * @example
     * // Update one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LoginAttemptUpdateArgs>(
      args: SelectSubset<T, LoginAttemptUpdateArgs>
    ): CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T>>>

    /**
     * Delete zero or more LoginAttempts.
     * @param {LoginAttemptDeleteManyArgs} args - Arguments to filter LoginAttempts to delete.
     * @example
     * // Delete a few LoginAttempts
     * const { count } = await prisma.loginAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LoginAttemptDeleteManyArgs>(
      args?: SelectSubset<T, LoginAttemptDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoginAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoginAttempts
     * const loginAttempt = await prisma.loginAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LoginAttemptUpdateManyArgs>(
      args: SelectSubset<T, LoginAttemptUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one LoginAttempt.
     * @param {LoginAttemptUpsertArgs} args - Arguments to update or create a LoginAttempt.
     * @example
     * // Update or create a LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.upsert({
     *   create: {
     *     // ... data to create a LoginAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoginAttempt we want to update
     *   }
     * })
    **/
    upsert<T extends LoginAttemptUpsertArgs>(
      args: SelectSubset<T, LoginAttemptUpsertArgs>
    ): CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T>>>

    /**
     * Find one LoginAttempt that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {LoginAttemptFindUniqueOrThrowArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LoginAttemptFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LoginAttemptFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T>>>

    /**
     * Find the first LoginAttempt that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptFindFirstOrThrowArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LoginAttemptFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LoginAttemptFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__LoginAttemptClient<LoginAttempt>, Prisma__LoginAttemptClient<LoginAttemptGetPayload<T>>>

    /**
     * Count the number of LoginAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptCountArgs} args - Arguments to filter LoginAttempts to count.
     * @example
     * // Count the number of LoginAttempts
     * const count = await prisma.loginAttempt.count({
     *   where: {
     *     // ... the filter for the LoginAttempts we want to count
     *   }
     * })
    **/
    count<T extends LoginAttemptCountArgs>(
      args?: Subset<T, LoginAttemptCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoginAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoginAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoginAttemptAggregateArgs>(args: Subset<T, LoginAttemptAggregateArgs>): PrismaPromise<GetLoginAttemptAggregateType<T>>

    /**
     * Group by LoginAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoginAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoginAttemptGroupByArgs['orderBy'] }
        : { orderBy?: LoginAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoginAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoginAttemptGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for LoginAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LoginAttemptClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * LoginAttempt base type for findUnique actions
   */
  export type LoginAttemptFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     * 
    **/
    select?: LoginAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LoginAttemptInclude | null
    /**
     * Filter, which LoginAttempt to fetch.
     * 
    **/
    where: LoginAttemptWhereUniqueInput
  }

  /**
   * LoginAttempt: findUnique
   */
  export interface LoginAttemptFindUniqueArgs extends LoginAttemptFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LoginAttempt base type for findFirst actions
   */
  export type LoginAttemptFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     * 
    **/
    select?: LoginAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LoginAttemptInclude | null
    /**
     * Filter, which LoginAttempt to fetch.
     * 
    **/
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     * 
    **/
    orderBy?: Enumerable<LoginAttemptOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoginAttempts.
     * 
    **/
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginAttempts.
     * 
    **/
    distinct?: Enumerable<LoginAttemptScalarFieldEnum>
  }

  /**
   * LoginAttempt: findFirst
   */
  export interface LoginAttemptFindFirstArgs extends LoginAttemptFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LoginAttempt findMany
   */
  export type LoginAttemptFindManyArgs = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     * 
    **/
    select?: LoginAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LoginAttemptInclude | null
    /**
     * Filter, which LoginAttempts to fetch.
     * 
    **/
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     * 
    **/
    orderBy?: Enumerable<LoginAttemptOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoginAttempts.
     * 
    **/
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LoginAttemptScalarFieldEnum>
  }


  /**
   * LoginAttempt create
   */
  export type LoginAttemptCreateArgs = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     * 
    **/
    select?: LoginAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LoginAttemptInclude | null
    /**
     * The data needed to create a LoginAttempt.
     * 
    **/
    data: XOR<LoginAttemptCreateInput, LoginAttemptUncheckedCreateInput>
  }


  /**
   * LoginAttempt createMany
   */
  export type LoginAttemptCreateManyArgs = {
    /**
     * The data used to create many LoginAttempts.
     * 
    **/
    data: Enumerable<LoginAttemptCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * LoginAttempt update
   */
  export type LoginAttemptUpdateArgs = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     * 
    **/
    select?: LoginAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LoginAttemptInclude | null
    /**
     * The data needed to update a LoginAttempt.
     * 
    **/
    data: XOR<LoginAttemptUpdateInput, LoginAttemptUncheckedUpdateInput>
    /**
     * Choose, which LoginAttempt to update.
     * 
    **/
    where: LoginAttemptWhereUniqueInput
  }


  /**
   * LoginAttempt updateMany
   */
  export type LoginAttemptUpdateManyArgs = {
    /**
     * The data used to update LoginAttempts.
     * 
    **/
    data: XOR<LoginAttemptUpdateManyMutationInput, LoginAttemptUncheckedUpdateManyInput>
    /**
     * Filter which LoginAttempts to update
     * 
    **/
    where?: LoginAttemptWhereInput
  }


  /**
   * LoginAttempt upsert
   */
  export type LoginAttemptUpsertArgs = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     * 
    **/
    select?: LoginAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LoginAttemptInclude | null
    /**
     * The filter to search for the LoginAttempt to update in case it exists.
     * 
    **/
    where: LoginAttemptWhereUniqueInput
    /**
     * In case the LoginAttempt found by the `where` argument doesn't exist, create a new LoginAttempt with this data.
     * 
    **/
    create: XOR<LoginAttemptCreateInput, LoginAttemptUncheckedCreateInput>
    /**
     * In case the LoginAttempt was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LoginAttemptUpdateInput, LoginAttemptUncheckedUpdateInput>
  }


  /**
   * LoginAttempt delete
   */
  export type LoginAttemptDeleteArgs = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     * 
    **/
    select?: LoginAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LoginAttemptInclude | null
    /**
     * Filter which LoginAttempt to delete.
     * 
    **/
    where: LoginAttemptWhereUniqueInput
  }


  /**
   * LoginAttempt deleteMany
   */
  export type LoginAttemptDeleteManyArgs = {
    /**
     * Filter which LoginAttempts to delete
     * 
    **/
    where?: LoginAttemptWhereInput
  }


  /**
   * LoginAttempt: findUniqueOrThrow
   */
  export type LoginAttemptFindUniqueOrThrowArgs = LoginAttemptFindUniqueArgsBase
      

  /**
   * LoginAttempt: findFirstOrThrow
   */
  export type LoginAttemptFindFirstOrThrowArgs = LoginAttemptFindFirstArgsBase
      

  /**
   * LoginAttempt without action
   */
  export type LoginAttemptArgs = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     * 
    **/
    select?: LoginAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LoginAttemptInclude | null
  }



  /**
   * Model DocumentEvent
   */


  export type AggregateDocumentEvent = {
    _count: DocumentEventCountAggregateOutputType | null
    _avg: DocumentEventAvgAggregateOutputType | null
    _sum: DocumentEventSumAggregateOutputType | null
    _min: DocumentEventMinAggregateOutputType | null
    _max: DocumentEventMaxAggregateOutputType | null
  }

  export type DocumentEventAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type DocumentEventSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type DocumentEventMinAggregateOutputType = {
    id: number | null
    occuredAt: Date | null
    documentId: string | null
    userId: number | null
  }

  export type DocumentEventMaxAggregateOutputType = {
    id: number | null
    occuredAt: Date | null
    documentId: string | null
    userId: number | null
  }

  export type DocumentEventCountAggregateOutputType = {
    id: number
    occuredAt: number
    documentId: number
    userId: number
    value: number
    _all: number
  }


  export type DocumentEventAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type DocumentEventSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type DocumentEventMinAggregateInputType = {
    id?: true
    occuredAt?: true
    documentId?: true
    userId?: true
  }

  export type DocumentEventMaxAggregateInputType = {
    id?: true
    occuredAt?: true
    documentId?: true
    userId?: true
  }

  export type DocumentEventCountAggregateInputType = {
    id?: true
    occuredAt?: true
    documentId?: true
    userId?: true
    value?: true
    _all?: true
  }

  export type DocumentEventAggregateArgs = {
    /**
     * Filter which DocumentEvent to aggregate.
     * 
    **/
    where?: DocumentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<DocumentEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DocumentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentEvents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentEvents
    **/
    _count?: true | DocumentEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentEventMaxAggregateInputType
  }

  export type GetDocumentEventAggregateType<T extends DocumentEventAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentEvent[P]>
      : GetScalarType<T[P], AggregateDocumentEvent[P]>
  }




  export type DocumentEventGroupByArgs = {
    where?: DocumentEventWhereInput
    orderBy?: Enumerable<DocumentEventOrderByWithAggregationInput>
    by: Array<DocumentEventScalarFieldEnum>
    having?: DocumentEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentEventCountAggregateInputType | true
    _avg?: DocumentEventAvgAggregateInputType
    _sum?: DocumentEventSumAggregateInputType
    _min?: DocumentEventMinAggregateInputType
    _max?: DocumentEventMaxAggregateInputType
  }


  export type DocumentEventGroupByOutputType = {
    id: number
    occuredAt: Date
    documentId: string
    userId: number
    value: JsonValue
    _count: DocumentEventCountAggregateOutputType | null
    _avg: DocumentEventAvgAggregateOutputType | null
    _sum: DocumentEventSumAggregateOutputType | null
    _min: DocumentEventMinAggregateOutputType | null
    _max: DocumentEventMaxAggregateOutputType | null
  }

  type GetDocumentEventGroupByPayload<T extends DocumentEventGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DocumentEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentEventGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentEventGroupByOutputType[P]>
        }
      >
    >


  export type DocumentEventSelect = {
    id?: boolean
    occuredAt?: boolean
    documentId?: boolean
    userId?: boolean
    value?: boolean
  }

  export type DocumentEventGetPayload<
    S extends boolean | null | undefined | DocumentEventArgs,
    U = keyof S
      > = S extends true
        ? DocumentEvent
    : S extends undefined
    ? never
    : S extends DocumentEventArgs | DocumentEventFindManyArgs
    ?'include' extends U
    ? DocumentEvent 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DocumentEvent ? DocumentEvent[P] : never
  } 
    : DocumentEvent
  : DocumentEvent


  type DocumentEventCountArgs = Merge<
    Omit<DocumentEventFindManyArgs, 'select' | 'include'> & {
      select?: DocumentEventCountAggregateInputType | true
    }
  >

  export interface DocumentEventDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one DocumentEvent that matches the filter.
     * @param {DocumentEventFindUniqueArgs} args - Arguments to find a DocumentEvent
     * @example
     * // Get one DocumentEvent
     * const documentEvent = await prisma.documentEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DocumentEventFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DocumentEventFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DocumentEvent'> extends True ? CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent>, Prisma__DocumentEventClient<DocumentEventGetPayload<T>>> : CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent | null, null>, Prisma__DocumentEventClient<DocumentEventGetPayload<T> | null, null>>

    /**
     * Find the first DocumentEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEventFindFirstArgs} args - Arguments to find a DocumentEvent
     * @example
     * // Get one DocumentEvent
     * const documentEvent = await prisma.documentEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DocumentEventFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DocumentEventFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DocumentEvent'> extends True ? CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent>, Prisma__DocumentEventClient<DocumentEventGetPayload<T>>> : CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent | null, null>, Prisma__DocumentEventClient<DocumentEventGetPayload<T> | null, null>>

    /**
     * Find zero or more DocumentEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEventFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentEvents
     * const documentEvents = await prisma.documentEvent.findMany()
     * 
     * // Get first 10 DocumentEvents
     * const documentEvents = await prisma.documentEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentEventWithIdOnly = await prisma.documentEvent.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DocumentEventFindManyArgs>(
      args?: SelectSubset<T, DocumentEventFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DocumentEvent>>, PrismaPromise<Array<DocumentEventGetPayload<T>>>>

    /**
     * Create a DocumentEvent.
     * @param {DocumentEventCreateArgs} args - Arguments to create a DocumentEvent.
     * @example
     * // Create one DocumentEvent
     * const DocumentEvent = await prisma.documentEvent.create({
     *   data: {
     *     // ... data to create a DocumentEvent
     *   }
     * })
     * 
    **/
    create<T extends DocumentEventCreateArgs>(
      args: SelectSubset<T, DocumentEventCreateArgs>
    ): CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent>, Prisma__DocumentEventClient<DocumentEventGetPayload<T>>>

    /**
     * Create many DocumentEvents.
     *     @param {DocumentEventCreateManyArgs} args - Arguments to create many DocumentEvents.
     *     @example
     *     // Create many DocumentEvents
     *     const documentEvent = await prisma.documentEvent.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DocumentEventCreateManyArgs>(
      args?: SelectSubset<T, DocumentEventCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DocumentEvent.
     * @param {DocumentEventDeleteArgs} args - Arguments to delete one DocumentEvent.
     * @example
     * // Delete one DocumentEvent
     * const DocumentEvent = await prisma.documentEvent.delete({
     *   where: {
     *     // ... filter to delete one DocumentEvent
     *   }
     * })
     * 
    **/
    delete<T extends DocumentEventDeleteArgs>(
      args: SelectSubset<T, DocumentEventDeleteArgs>
    ): CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent>, Prisma__DocumentEventClient<DocumentEventGetPayload<T>>>

    /**
     * Update one DocumentEvent.
     * @param {DocumentEventUpdateArgs} args - Arguments to update one DocumentEvent.
     * @example
     * // Update one DocumentEvent
     * const documentEvent = await prisma.documentEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DocumentEventUpdateArgs>(
      args: SelectSubset<T, DocumentEventUpdateArgs>
    ): CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent>, Prisma__DocumentEventClient<DocumentEventGetPayload<T>>>

    /**
     * Delete zero or more DocumentEvents.
     * @param {DocumentEventDeleteManyArgs} args - Arguments to filter DocumentEvents to delete.
     * @example
     * // Delete a few DocumentEvents
     * const { count } = await prisma.documentEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DocumentEventDeleteManyArgs>(
      args?: SelectSubset<T, DocumentEventDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentEvents
     * const documentEvent = await prisma.documentEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DocumentEventUpdateManyArgs>(
      args: SelectSubset<T, DocumentEventUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DocumentEvent.
     * @param {DocumentEventUpsertArgs} args - Arguments to update or create a DocumentEvent.
     * @example
     * // Update or create a DocumentEvent
     * const documentEvent = await prisma.documentEvent.upsert({
     *   create: {
     *     // ... data to create a DocumentEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentEvent we want to update
     *   }
     * })
    **/
    upsert<T extends DocumentEventUpsertArgs>(
      args: SelectSubset<T, DocumentEventUpsertArgs>
    ): CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent>, Prisma__DocumentEventClient<DocumentEventGetPayload<T>>>

    /**
     * Find one DocumentEvent that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DocumentEventFindUniqueOrThrowArgs} args - Arguments to find a DocumentEvent
     * @example
     * // Get one DocumentEvent
     * const documentEvent = await prisma.documentEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DocumentEventFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DocumentEventFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent>, Prisma__DocumentEventClient<DocumentEventGetPayload<T>>>

    /**
     * Find the first DocumentEvent that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEventFindFirstOrThrowArgs} args - Arguments to find a DocumentEvent
     * @example
     * // Get one DocumentEvent
     * const documentEvent = await prisma.documentEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DocumentEventFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DocumentEventFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DocumentEventClient<DocumentEvent>, Prisma__DocumentEventClient<DocumentEventGetPayload<T>>>

    /**
     * Count the number of DocumentEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEventCountArgs} args - Arguments to filter DocumentEvents to count.
     * @example
     * // Count the number of DocumentEvents
     * const count = await prisma.documentEvent.count({
     *   where: {
     *     // ... the filter for the DocumentEvents we want to count
     *   }
     * })
    **/
    count<T extends DocumentEventCountArgs>(
      args?: Subset<T, DocumentEventCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentEventAggregateArgs>(args: Subset<T, DocumentEventAggregateArgs>): PrismaPromise<GetDocumentEventAggregateType<T>>

    /**
     * Group by DocumentEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentEventGroupByArgs['orderBy'] }
        : { orderBy?: DocumentEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentEventGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DocumentEventClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * DocumentEvent base type for findUnique actions
   */
  export type DocumentEventFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DocumentEvent
     * 
    **/
    select?: DocumentEventSelect | null
    /**
     * Filter, which DocumentEvent to fetch.
     * 
    **/
    where: DocumentEventWhereUniqueInput
  }

  /**
   * DocumentEvent: findUnique
   */
  export interface DocumentEventFindUniqueArgs extends DocumentEventFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DocumentEvent base type for findFirst actions
   */
  export type DocumentEventFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DocumentEvent
     * 
    **/
    select?: DocumentEventSelect | null
    /**
     * Filter, which DocumentEvent to fetch.
     * 
    **/
    where?: DocumentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<DocumentEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentEvents.
     * 
    **/
    cursor?: DocumentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentEvents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentEvents.
     * 
    **/
    distinct?: Enumerable<DocumentEventScalarFieldEnum>
  }

  /**
   * DocumentEvent: findFirst
   */
  export interface DocumentEventFindFirstArgs extends DocumentEventFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DocumentEvent findMany
   */
  export type DocumentEventFindManyArgs = {
    /**
     * Select specific fields to fetch from the DocumentEvent
     * 
    **/
    select?: DocumentEventSelect | null
    /**
     * Filter, which DocumentEvents to fetch.
     * 
    **/
    where?: DocumentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<DocumentEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentEvents.
     * 
    **/
    cursor?: DocumentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentEvents.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DocumentEventScalarFieldEnum>
  }


  /**
   * DocumentEvent create
   */
  export type DocumentEventCreateArgs = {
    /**
     * Select specific fields to fetch from the DocumentEvent
     * 
    **/
    select?: DocumentEventSelect | null
    /**
     * The data needed to create a DocumentEvent.
     * 
    **/
    data: XOR<DocumentEventCreateInput, DocumentEventUncheckedCreateInput>
  }


  /**
   * DocumentEvent createMany
   */
  export type DocumentEventCreateManyArgs = {
    /**
     * The data used to create many DocumentEvents.
     * 
    **/
    data: Enumerable<DocumentEventCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DocumentEvent update
   */
  export type DocumentEventUpdateArgs = {
    /**
     * Select specific fields to fetch from the DocumentEvent
     * 
    **/
    select?: DocumentEventSelect | null
    /**
     * The data needed to update a DocumentEvent.
     * 
    **/
    data: XOR<DocumentEventUpdateInput, DocumentEventUncheckedUpdateInput>
    /**
     * Choose, which DocumentEvent to update.
     * 
    **/
    where: DocumentEventWhereUniqueInput
  }


  /**
   * DocumentEvent updateMany
   */
  export type DocumentEventUpdateManyArgs = {
    /**
     * The data used to update DocumentEvents.
     * 
    **/
    data: XOR<DocumentEventUpdateManyMutationInput, DocumentEventUncheckedUpdateManyInput>
    /**
     * Filter which DocumentEvents to update
     * 
    **/
    where?: DocumentEventWhereInput
  }


  /**
   * DocumentEvent upsert
   */
  export type DocumentEventUpsertArgs = {
    /**
     * Select specific fields to fetch from the DocumentEvent
     * 
    **/
    select?: DocumentEventSelect | null
    /**
     * The filter to search for the DocumentEvent to update in case it exists.
     * 
    **/
    where: DocumentEventWhereUniqueInput
    /**
     * In case the DocumentEvent found by the `where` argument doesn't exist, create a new DocumentEvent with this data.
     * 
    **/
    create: XOR<DocumentEventCreateInput, DocumentEventUncheckedCreateInput>
    /**
     * In case the DocumentEvent was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DocumentEventUpdateInput, DocumentEventUncheckedUpdateInput>
  }


  /**
   * DocumentEvent delete
   */
  export type DocumentEventDeleteArgs = {
    /**
     * Select specific fields to fetch from the DocumentEvent
     * 
    **/
    select?: DocumentEventSelect | null
    /**
     * Filter which DocumentEvent to delete.
     * 
    **/
    where: DocumentEventWhereUniqueInput
  }


  /**
   * DocumentEvent deleteMany
   */
  export type DocumentEventDeleteManyArgs = {
    /**
     * Filter which DocumentEvents to delete
     * 
    **/
    where?: DocumentEventWhereInput
  }


  /**
   * DocumentEvent: findUniqueOrThrow
   */
  export type DocumentEventFindUniqueOrThrowArgs = DocumentEventFindUniqueArgsBase
      

  /**
   * DocumentEvent: findFirstOrThrow
   */
  export type DocumentEventFindFirstOrThrowArgs = DocumentEventFindFirstArgsBase
      

  /**
   * DocumentEvent without action
   */
  export type DocumentEventArgs = {
    /**
     * Select specific fields to fetch from the DocumentEvent
     * 
    **/
    select?: DocumentEventSelect | null
  }



  /**
   * Model Document
   */


  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    version: number | null
    userId: number | null
  }

  export type DocumentSumAggregateOutputType = {
    version: number | null
    userId: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    userId: number | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    userId: number | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    version: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    userId: number
    value: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    version?: true
    userId?: true
  }

  export type DocumentSumAggregateInputType = {
    version?: true
    userId?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    userId?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    userId?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    userId?: true
    value?: true
    _all?: true
  }

  export type DocumentAggregateArgs = {
    /**
     * Filter which Document to aggregate.
     * 
    **/
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     * 
    **/
    orderBy?: Enumerable<DocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs = {
    where?: DocumentWhereInput
    orderBy?: Enumerable<DocumentOrderByWithAggregationInput>
    by: Array<DocumentScalarFieldEnum>
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }


  export type DocumentGroupByOutputType = {
    id: string
    version: number
    createdAt: Date
    updatedAt: Date | null
    deletedAt: Date | null
    userId: number
    value: JsonValue
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect = {
    id?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    value?: boolean
  }

  export type DocumentInclude = {
    user?: boolean | UserArgs
  }

  export type DocumentGetPayload<
    S extends boolean | null | undefined | DocumentArgs,
    U = keyof S
      > = S extends true
        ? Document
    : S extends undefined
    ? never
    : S extends DocumentArgs | DocumentFindManyArgs
    ?'include' extends U
    ? Document  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Document ? Document[P] : never
  } 
    : Document
  : Document


  type DocumentCountArgs = Merge<
    Omit<DocumentFindManyArgs, 'select' | 'include'> & {
      select?: DocumentCountAggregateInputType | true
    }
  >

  export interface DocumentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DocumentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DocumentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Document'> extends True ? CheckSelect<T, Prisma__DocumentClient<Document>, Prisma__DocumentClient<DocumentGetPayload<T>>> : CheckSelect<T, Prisma__DocumentClient<Document | null, null>, Prisma__DocumentClient<DocumentGetPayload<T> | null, null>>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DocumentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DocumentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Document'> extends True ? CheckSelect<T, Prisma__DocumentClient<Document>, Prisma__DocumentClient<DocumentGetPayload<T>>> : CheckSelect<T, Prisma__DocumentClient<Document | null, null>, Prisma__DocumentClient<DocumentGetPayload<T> | null, null>>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DocumentFindManyArgs>(
      args?: SelectSubset<T, DocumentFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Document>>, PrismaPromise<Array<DocumentGetPayload<T>>>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
    **/
    create<T extends DocumentCreateArgs>(
      args: SelectSubset<T, DocumentCreateArgs>
    ): CheckSelect<T, Prisma__DocumentClient<Document>, Prisma__DocumentClient<DocumentGetPayload<T>>>

    /**
     * Create many Documents.
     *     @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     *     @example
     *     // Create many Documents
     *     const document = await prisma.document.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DocumentCreateManyArgs>(
      args?: SelectSubset<T, DocumentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
    **/
    delete<T extends DocumentDeleteArgs>(
      args: SelectSubset<T, DocumentDeleteArgs>
    ): CheckSelect<T, Prisma__DocumentClient<Document>, Prisma__DocumentClient<DocumentGetPayload<T>>>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DocumentUpdateArgs>(
      args: SelectSubset<T, DocumentUpdateArgs>
    ): CheckSelect<T, Prisma__DocumentClient<Document>, Prisma__DocumentClient<DocumentGetPayload<T>>>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DocumentDeleteManyArgs>(
      args?: SelectSubset<T, DocumentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DocumentUpdateManyArgs>(
      args: SelectSubset<T, DocumentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
    **/
    upsert<T extends DocumentUpsertArgs>(
      args: SelectSubset<T, DocumentUpsertArgs>
    ): CheckSelect<T, Prisma__DocumentClient<Document>, Prisma__DocumentClient<DocumentGetPayload<T>>>

    /**
     * Find one Document that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DocumentFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DocumentClient<Document>, Prisma__DocumentClient<DocumentGetPayload<T>>>

    /**
     * Find the first Document that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DocumentFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DocumentClient<Document>, Prisma__DocumentClient<DocumentGetPayload<T>>>

    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DocumentClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Document base type for findUnique actions
   */
  export type DocumentFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Document
     * 
    **/
    select?: DocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DocumentInclude | null
    /**
     * Filter, which Document to fetch.
     * 
    **/
    where: DocumentWhereUniqueInput
  }

  /**
   * Document: findUnique
   */
  export interface DocumentFindUniqueArgs extends DocumentFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Document base type for findFirst actions
   */
  export type DocumentFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Document
     * 
    **/
    select?: DocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DocumentInclude | null
    /**
     * Filter, which Document to fetch.
     * 
    **/
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     * 
    **/
    orderBy?: Enumerable<DocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     * 
    **/
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     * 
    **/
    distinct?: Enumerable<DocumentScalarFieldEnum>
  }

  /**
   * Document: findFirst
   */
  export interface DocumentFindFirstArgs extends DocumentFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs = {
    /**
     * Select specific fields to fetch from the Document
     * 
    **/
    select?: DocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DocumentInclude | null
    /**
     * Filter, which Documents to fetch.
     * 
    **/
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     * 
    **/
    orderBy?: Enumerable<DocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     * 
    **/
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DocumentScalarFieldEnum>
  }


  /**
   * Document create
   */
  export type DocumentCreateArgs = {
    /**
     * Select specific fields to fetch from the Document
     * 
    **/
    select?: DocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DocumentInclude | null
    /**
     * The data needed to create a Document.
     * 
    **/
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }


  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs = {
    /**
     * The data used to create many Documents.
     * 
    **/
    data: Enumerable<DocumentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Document update
   */
  export type DocumentUpdateArgs = {
    /**
     * Select specific fields to fetch from the Document
     * 
    **/
    select?: DocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DocumentInclude | null
    /**
     * The data needed to update a Document.
     * 
    **/
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     * 
    **/
    where: DocumentWhereUniqueInput
  }


  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs = {
    /**
     * The data used to update Documents.
     * 
    **/
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     * 
    **/
    where?: DocumentWhereInput
  }


  /**
   * Document upsert
   */
  export type DocumentUpsertArgs = {
    /**
     * Select specific fields to fetch from the Document
     * 
    **/
    select?: DocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DocumentInclude | null
    /**
     * The filter to search for the Document to update in case it exists.
     * 
    **/
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     * 
    **/
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }


  /**
   * Document delete
   */
  export type DocumentDeleteArgs = {
    /**
     * Select specific fields to fetch from the Document
     * 
    **/
    select?: DocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DocumentInclude | null
    /**
     * Filter which Document to delete.
     * 
    **/
    where: DocumentWhereUniqueInput
  }


  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs = {
    /**
     * Filter which Documents to delete
     * 
    **/
    where?: DocumentWhereInput
  }


  /**
   * Document: findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs = DocumentFindUniqueArgsBase
      

  /**
   * Document: findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs = DocumentFindFirstArgsBase
      

  /**
   * Document without action
   */
  export type DocumentArgs = {
    /**
     * Select specific fields to fetch from the Document
     * 
    **/
    select?: DocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DocumentInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const DocumentEventScalarFieldEnum: {
    id: 'id',
    occuredAt: 'occuredAt',
    documentId: 'documentId',
    userId: 'userId',
    value: 'value'
  };

  export type DocumentEventScalarFieldEnum = (typeof DocumentEventScalarFieldEnum)[keyof typeof DocumentEventScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    userId: 'userId',
    value: 'value'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const LoginAttemptScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    host: 'host',
    accepted: 'accepted',
    resolved: 'resolved'
  };

  export type LoginAttemptScalarFieldEnum = (typeof LoginAttemptScalarFieldEnum)[keyof typeof LoginAttemptScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    type: 'type',
    payload: 'payload'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SessionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    lastSeenAt: 'lastSeenAt',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    email: 'email',
    passwordSalt: 'passwordSalt',
    passwordHash: 'passwordHash',
    did: 'did',
    didSecret: 'didSecret',
    vaultKey: 'vaultKey'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    email?: StringNullableFilter | string | null
    passwordSalt?: StringNullableFilter | string | null
    passwordHash?: StringNullableFilter | string | null
    did?: StringFilter | string
    didSecret?: StringFilter | string
    vaultKey?: StringFilter | string
    sessions?: SessionListRelationFilter
    notifications?: NotificationListRelationFilter
    loginAttempts?: LoginAttemptListRelationFilter
    documents?: DocumentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    passwordSalt?: SortOrder
    passwordHash?: SortOrder
    did?: SortOrder
    didSecret?: SortOrder
    vaultKey?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    loginAttempts?: LoginAttemptOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
    email?: string
    did?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    passwordSalt?: SortOrder
    passwordHash?: SortOrder
    did?: SortOrder
    didSecret?: SortOrder
    vaultKey?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    email?: StringNullableWithAggregatesFilter | string | null
    passwordSalt?: StringNullableWithAggregatesFilter | string | null
    passwordHash?: StringNullableWithAggregatesFilter | string | null
    did?: StringWithAggregatesFilter | string
    didSecret?: StringWithAggregatesFilter | string
    vaultKey?: StringWithAggregatesFilter | string
  }

  export type SessionWhereInput = {
    AND?: Enumerable<SessionWhereInput>
    OR?: Enumerable<SessionWhereInput>
    NOT?: Enumerable<SessionWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    lastSeenAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput> | null
    userId?: IntNullableFilter | number | null
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
  }

  export type SessionWhereUniqueInput = {
    id?: string
  }

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<SessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SessionScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    lastSeenAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntNullableWithAggregatesFilter | number | null
  }

  export type NotificationWhereInput = {
    AND?: Enumerable<NotificationWhereInput>
    OR?: Enumerable<NotificationWhereInput>
    NOT?: Enumerable<NotificationWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    type?: StringFilter | string
    payload?: JsonFilter
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
    type?: SortOrder
    payload?: SortOrder
  }

  export type NotificationWhereUniqueInput = {
    id?: number
  }

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    payload?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    OR?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntWithAggregatesFilter | number
    type?: StringWithAggregatesFilter | string
    payload?: JsonWithAggregatesFilter
  }

  export type LoginAttemptWhereInput = {
    AND?: Enumerable<LoginAttemptWhereInput>
    OR?: Enumerable<LoginAttemptWhereInput>
    NOT?: Enumerable<LoginAttemptWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    host?: StringFilter | string
    accepted?: BoolFilter | boolean
    resolved?: BoolFilter | boolean
  }

  export type LoginAttemptOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
    host?: SortOrder
    accepted?: SortOrder
    resolved?: SortOrder
  }

  export type LoginAttemptWhereUniqueInput = {
    id?: string
  }

  export type LoginAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    host?: SortOrder
    accepted?: SortOrder
    resolved?: SortOrder
    _count?: LoginAttemptCountOrderByAggregateInput
    _avg?: LoginAttemptAvgOrderByAggregateInput
    _max?: LoginAttemptMaxOrderByAggregateInput
    _min?: LoginAttemptMinOrderByAggregateInput
    _sum?: LoginAttemptSumOrderByAggregateInput
  }

  export type LoginAttemptScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LoginAttemptScalarWhereWithAggregatesInput>
    OR?: Enumerable<LoginAttemptScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LoginAttemptScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntWithAggregatesFilter | number
    host?: StringWithAggregatesFilter | string
    accepted?: BoolWithAggregatesFilter | boolean
    resolved?: BoolWithAggregatesFilter | boolean
  }

  export type DocumentEventWhereInput = {
    AND?: Enumerable<DocumentEventWhereInput>
    OR?: Enumerable<DocumentEventWhereInput>
    NOT?: Enumerable<DocumentEventWhereInput>
    id?: IntFilter | number
    occuredAt?: DateTimeFilter | Date | string
    documentId?: StringFilter | string
    userId?: IntFilter | number
    value?: JsonFilter
  }

  export type DocumentEventOrderByWithRelationInput = {
    id?: SortOrder
    occuredAt?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    value?: SortOrder
  }

  export type DocumentEventWhereUniqueInput = {
    id?: number
  }

  export type DocumentEventOrderByWithAggregationInput = {
    id?: SortOrder
    occuredAt?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    value?: SortOrder
    _count?: DocumentEventCountOrderByAggregateInput
    _avg?: DocumentEventAvgOrderByAggregateInput
    _max?: DocumentEventMaxOrderByAggregateInput
    _min?: DocumentEventMinOrderByAggregateInput
    _sum?: DocumentEventSumOrderByAggregateInput
  }

  export type DocumentEventScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DocumentEventScalarWhereWithAggregatesInput>
    OR?: Enumerable<DocumentEventScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DocumentEventScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    occuredAt?: DateTimeWithAggregatesFilter | Date | string
    documentId?: StringWithAggregatesFilter | string
    userId?: IntWithAggregatesFilter | number
    value?: JsonWithAggregatesFilter
  }

  export type DocumentWhereInput = {
    AND?: Enumerable<DocumentWhereInput>
    OR?: Enumerable<DocumentWhereInput>
    NOT?: Enumerable<DocumentWhereInput>
    id?: StringFilter | string
    version?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeNullableFilter | Date | string | null
    deletedAt?: DateTimeNullableFilter | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    value?: JsonFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
    value?: SortOrder
  }

  export type DocumentWhereUniqueInput = {
    id?: string
  }

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    value?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DocumentScalarWhereWithAggregatesInput>
    OR?: Enumerable<DocumentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DocumentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    version?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    userId?: IntWithAggregatesFilter | number
    value?: JsonWithAggregatesFilter
  }

  export type UserCreateInput = {
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    sessions?: SessionCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
  }

  export type UserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateInput = {
    id?: string
    createdAt?: Date | string
    lastSeenAt?: Date | string
    user?: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    lastSeenAt?: Date | string
    userId?: number | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionCreateManyInput = {
    id?: string
    createdAt?: Date | string
    lastSeenAt?: Date | string
    userId?: number | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type NotificationCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    type: string
    payload: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    userId: number
    type: string
    payload: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
  }

  export type NotificationCreateManyInput = {
    id?: number
    createdAt?: Date | string
    userId: number
    type: string
    payload: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
  }

  export type LoginAttemptCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLoginAttemptsInput
    host: string
    accepted?: boolean
    resolved?: boolean
  }

  export type LoginAttemptUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: number
    host: string
    accepted?: boolean
    resolved?: boolean
  }

  export type LoginAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLoginAttemptsNestedInput
    host?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LoginAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    host?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LoginAttemptCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: number
    host: string
    accepted?: boolean
    resolved?: boolean
  }

  export type LoginAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LoginAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    host?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DocumentEventCreateInput = {
    occuredAt?: Date | string
    documentId: string
    userId: number
    value: JsonNullValueInput | InputJsonValue
  }

  export type DocumentEventUncheckedCreateInput = {
    id?: number
    occuredAt?: Date | string
    documentId: string
    userId: number
    value: JsonNullValueInput | InputJsonValue
  }

  export type DocumentEventUpdateInput = {
    occuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    value?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    occuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    value?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentEventCreateManyInput = {
    id?: number
    occuredAt?: Date | string
    documentId: string
    userId: number
    value: JsonNullValueInput | InputJsonValue
  }

  export type DocumentEventUpdateManyMutationInput = {
    occuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    value?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    occuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    value?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentCreateInput = {
    id?: string
    version: number
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDocumentsInput
    value: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    version: number
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    userId: number
    value: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    value?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    value?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentCreateManyInput = {
    id?: string
    version: number
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    userId: number
    value: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    value?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    value?: JsonNullValueInput | InputJsonValue
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type LoginAttemptListRelationFilter = {
    every?: LoginAttemptWhereInput
    some?: LoginAttemptWhereInput
    none?: LoginAttemptWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoginAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    passwordSalt?: SortOrder
    passwordHash?: SortOrder
    did?: SortOrder
    didSecret?: SortOrder
    vaultKey?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    passwordSalt?: SortOrder
    passwordHash?: SortOrder
    did?: SortOrder
    didSecret?: SortOrder
    vaultKey?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    passwordSalt?: SortOrder
    passwordHash?: SortOrder
    did?: SortOrder
    didSecret?: SortOrder
    vaultKey?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
    userId?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
    userId?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    payload?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    type?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    type?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type LoginAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    host?: SortOrder
    accepted?: SortOrder
    resolved?: SortOrder
  }

  export type LoginAttemptAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type LoginAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    host?: SortOrder
    accepted?: SortOrder
    resolved?: SortOrder
  }

  export type LoginAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    host?: SortOrder
    accepted?: SortOrder
    resolved?: SortOrder
  }

  export type LoginAttemptSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DocumentEventCountOrderByAggregateInput = {
    id?: SortOrder
    occuredAt?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    value?: SortOrder
  }

  export type DocumentEventAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type DocumentEventMaxOrderByAggregateInput = {
    id?: SortOrder
    occuredAt?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
  }

  export type DocumentEventMinOrderByAggregateInput = {
    id?: SortOrder
    occuredAt?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
  }

  export type DocumentEventSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    value?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    version?: SortOrder
    userId?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    version?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutUserInput>, Enumerable<NotificationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutUserInput>
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type LoginAttemptCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<LoginAttemptCreateWithoutUserInput>, Enumerable<LoginAttemptUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LoginAttemptCreateOrConnectWithoutUserInput>
    createMany?: LoginAttemptCreateManyUserInputEnvelope
    connect?: Enumerable<LoginAttemptWhereUniqueInput>
  }

  export type DocumentCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DocumentCreateWithoutUserInput>, Enumerable<DocumentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DocumentCreateOrConnectWithoutUserInput>
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: Enumerable<DocumentWhereUniqueInput>
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutUserInput>, Enumerable<NotificationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutUserInput>
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type LoginAttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<LoginAttemptCreateWithoutUserInput>, Enumerable<LoginAttemptUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LoginAttemptCreateOrConnectWithoutUserInput>
    createMany?: LoginAttemptCreateManyUserInputEnvelope
    connect?: Enumerable<LoginAttemptWhereUniqueInput>
  }

  export type DocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DocumentCreateWithoutUserInput>, Enumerable<DocumentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DocumentCreateOrConnectWithoutUserInput>
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: Enumerable<DocumentWhereUniqueInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutUserInput>, Enumerable<NotificationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutUserInput>
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    connect?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type LoginAttemptUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<LoginAttemptCreateWithoutUserInput>, Enumerable<LoginAttemptUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LoginAttemptCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<LoginAttemptUpsertWithWhereUniqueWithoutUserInput>
    createMany?: LoginAttemptCreateManyUserInputEnvelope
    set?: Enumerable<LoginAttemptWhereUniqueInput>
    disconnect?: Enumerable<LoginAttemptWhereUniqueInput>
    delete?: Enumerable<LoginAttemptWhereUniqueInput>
    connect?: Enumerable<LoginAttemptWhereUniqueInput>
    update?: Enumerable<LoginAttemptUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<LoginAttemptUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<LoginAttemptScalarWhereInput>
  }

  export type DocumentUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DocumentCreateWithoutUserInput>, Enumerable<DocumentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DocumentCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DocumentUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: Enumerable<DocumentWhereUniqueInput>
    disconnect?: Enumerable<DocumentWhereUniqueInput>
    delete?: Enumerable<DocumentWhereUniqueInput>
    connect?: Enumerable<DocumentWhereUniqueInput>
    update?: Enumerable<DocumentUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DocumentUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DocumentScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutUserInput>, Enumerable<NotificationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutUserInput>
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    connect?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type LoginAttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<LoginAttemptCreateWithoutUserInput>, Enumerable<LoginAttemptUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LoginAttemptCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<LoginAttemptUpsertWithWhereUniqueWithoutUserInput>
    createMany?: LoginAttemptCreateManyUserInputEnvelope
    set?: Enumerable<LoginAttemptWhereUniqueInput>
    disconnect?: Enumerable<LoginAttemptWhereUniqueInput>
    delete?: Enumerable<LoginAttemptWhereUniqueInput>
    connect?: Enumerable<LoginAttemptWhereUniqueInput>
    update?: Enumerable<LoginAttemptUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<LoginAttemptUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<LoginAttemptScalarWhereInput>
  }

  export type DocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DocumentCreateWithoutUserInput>, Enumerable<DocumentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DocumentCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DocumentUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: Enumerable<DocumentWhereUniqueInput>
    disconnect?: Enumerable<DocumentWhereUniqueInput>
    delete?: Enumerable<DocumentWhereUniqueInput>
    connect?: Enumerable<DocumentWhereUniqueInput>
    update?: Enumerable<DocumentUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DocumentUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DocumentScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutLoginAttemptsInput = {
    create?: XOR<UserCreateWithoutLoginAttemptsInput, UserUncheckedCreateWithoutLoginAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoginAttemptsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLoginAttemptsNestedInput = {
    create?: XOR<UserCreateWithoutLoginAttemptsInput, UserUncheckedCreateWithoutLoginAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoginAttemptsInput
    upsert?: UserUpsertWithoutLoginAttemptsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutLoginAttemptsInput, UserUncheckedUpdateWithoutLoginAttemptsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    upsert?: UserUpsertWithoutDocumentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    lastSeenAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    lastSeenAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: Enumerable<SessionCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    createdAt?: Date | string
    type: string
    payload: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    type: string
    payload: JsonNullValueInput | InputJsonValue
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: Enumerable<NotificationCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type LoginAttemptCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    host: string
    accepted?: boolean
    resolved?: boolean
  }

  export type LoginAttemptUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    host: string
    accepted?: boolean
    resolved?: boolean
  }

  export type LoginAttemptCreateOrConnectWithoutUserInput = {
    where: LoginAttemptWhereUniqueInput
    create: XOR<LoginAttemptCreateWithoutUserInput, LoginAttemptUncheckedCreateWithoutUserInput>
  }

  export type LoginAttemptCreateManyUserInputEnvelope = {
    data: Enumerable<LoginAttemptCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutUserInput = {
    id?: string
    version: number
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    value: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedCreateWithoutUserInput = {
    id?: string
    version: number
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    value: JsonNullValueInput | InputJsonValue
  }

  export type DocumentCreateOrConnectWithoutUserInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentCreateManyUserInputEnvelope = {
    data: Enumerable<DocumentCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutSessionsInput>
  }

  export type SessionScalarWhereInput = {
    AND?: Enumerable<SessionScalarWhereInput>
    OR?: Enumerable<SessionScalarWhereInput>
    NOT?: Enumerable<SessionScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    lastSeenAt?: DateTimeFilter | Date | string
    userId?: IntNullableFilter | number | null
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutNotificationsInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: Enumerable<NotificationScalarWhereInput>
    OR?: Enumerable<NotificationScalarWhereInput>
    NOT?: Enumerable<NotificationScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    userId?: IntFilter | number
    type?: StringFilter | string
    payload?: JsonFilter
  }

  export type LoginAttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: LoginAttemptWhereUniqueInput
    update: XOR<LoginAttemptUpdateWithoutUserInput, LoginAttemptUncheckedUpdateWithoutUserInput>
    create: XOR<LoginAttemptCreateWithoutUserInput, LoginAttemptUncheckedCreateWithoutUserInput>
  }

  export type LoginAttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: LoginAttemptWhereUniqueInput
    data: XOR<LoginAttemptUpdateWithoutUserInput, LoginAttemptUncheckedUpdateWithoutUserInput>
  }

  export type LoginAttemptUpdateManyWithWhereWithoutUserInput = {
    where: LoginAttemptScalarWhereInput
    data: XOR<LoginAttemptUpdateManyMutationInput, LoginAttemptUncheckedUpdateManyWithoutLoginAttemptsInput>
  }

  export type LoginAttemptScalarWhereInput = {
    AND?: Enumerable<LoginAttemptScalarWhereInput>
    OR?: Enumerable<LoginAttemptScalarWhereInput>
    NOT?: Enumerable<LoginAttemptScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    userId?: IntFilter | number
    host?: StringFilter | string
    accepted?: BoolFilter | boolean
    resolved?: BoolFilter | boolean
  }

  export type DocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
  }

  export type DocumentUpdateManyWithWhereWithoutUserInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutDocumentsInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: Enumerable<DocumentScalarWhereInput>
    OR?: Enumerable<DocumentScalarWhereInput>
    NOT?: Enumerable<DocumentScalarWhereInput>
    id?: StringFilter | string
    version?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeNullableFilter | Date | string | null
    deletedAt?: DateTimeNullableFilter | Date | string | null
    userId?: IntFilter | number
    value?: JsonFilter
  }

  export type UserCreateWithoutSessionsInput = {
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    notifications?: NotificationCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: number
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    sessions?: SessionCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: number
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLoginAttemptsInput = {
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    sessions?: SessionCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLoginAttemptsInput = {
    id?: number
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLoginAttemptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLoginAttemptsInput, UserUncheckedCreateWithoutLoginAttemptsInput>
  }

  export type UserUpsertWithoutLoginAttemptsInput = {
    update: XOR<UserUpdateWithoutLoginAttemptsInput, UserUncheckedUpdateWithoutLoginAttemptsInput>
    create: XOR<UserCreateWithoutLoginAttemptsInput, UserUncheckedCreateWithoutLoginAttemptsInput>
  }

  export type UserUpdateWithoutLoginAttemptsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLoginAttemptsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDocumentsInput = {
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    sessions?: SessionCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocumentsInput = {
    id?: number
    createdAt?: Date | string
    email?: string | null
    passwordSalt?: string | null
    passwordHash?: string | null
    did: string
    didSecret: string
    vaultKey: string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
  }

  export type UserUpsertWithoutDocumentsInput = {
    update: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
  }

  export type UserUpdateWithoutDocumentsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordSalt?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    did?: StringFieldUpdateOperationsInput | string
    didSecret?: StringFieldUpdateOperationsInput | string
    vaultKey?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    lastSeenAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    type: string
    payload: JsonNullValueInput | InputJsonValue
  }

  export type LoginAttemptCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    host: string
    accepted?: boolean
    resolved?: boolean
  }

  export type DocumentCreateManyUserInput = {
    id?: string
    version: number
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    value: JsonNullValueInput | InputJsonValue
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedUpdateManyWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
  }

  export type LoginAttemptUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LoginAttemptUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LoginAttemptUncheckedUpdateManyWithoutLoginAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DocumentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    value?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    value?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateManyWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    value?: JsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}